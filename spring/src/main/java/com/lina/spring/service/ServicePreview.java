package com.lina.spring.service;

import com.lina.spring.dtos.InfoPreviewFluxNouvellesDto;
import com.lina.spring.models.FluxNouvelles;
import com.lina.spring.models.InfoPreviewFluxNouvelles;
import com.lina.spring.models.InfoPreviewRaccourcis;
import org.apache.tomcat.util.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.jsoup.HttpStatusException;
import org.jsoup.Jsoup;
import org.jsoup.internal.StringUtil;
import org.jsoup.nodes.Document;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import com.google.common.net.InternetDomainName;
import org.jsoup.nodes.Element;
import org.jsoup.parser.Parser;
import org.jsoup.select.Elements;

import static org.jsoup.internal.StringUtil.isBlank;

public class ServicePreview {
  private static String getTitle(Document document) {
    String title = getMetaTagText(document, "meta[property=og:title]", "content");
    if (isBlank(title)) {
      title = getMetaTagText(document, "meta[name=twitter:title]", "content");
    }
    if (isBlank(title)) {
      title = getMetaTagText(document, "meta[name=title]", "content");
    }
    if (isBlank(title)) {
      title = getTagText(document, "title");
    }
    if (isBlank(title)) {
      title = getTagText(document, "h1");
    }
    if (isBlank(title)) {
      title = getTagText(document, "h2");
    }

    return title;
  }

  private static String getDescription(Document document) {
    String description = getMetaTagText(document, "meta[property=og:description]", "content");
    if (isBlank(description)) {
      description = getMetaTagText(document, "meta[name=twitter:description]", "content");
    }
    if (isBlank(description)) {
      description = getMetaTagText(document, "meta[name=description]", "content");
    }
    if (isBlank(description)) {
      description = getTagText(document, "p");
    }

    return description;
  }

  private static String getImageUrl(Document document, String raccourcisUrl, String domain) {
    String imageUrl = getMetaTagText(document, "meta[property=og:image]", "content");
    if (isBlank(imageUrl)) {
      imageUrl = getMetaTagText(document, "meta[name=twitter:image]", "content");
    }
    if (isBlank(imageUrl)) {
      imageUrl = getMetaTagText(document, "link[rel=image_src]", "href");
    }
    if (isBlank(imageUrl)) {
      imageUrl = getMetaTagText(document, "img", "src");
    }
    if (!(imageUrl == null || imageUrl.isEmpty() || imageUrl.trim().isEmpty())) {
      Boolean isHttps = raccourcisUrl.toLowerCase().startsWith("https");
      if (imageUrl.startsWith("//")) {
        imageUrl = ((isHttps) ? "https" : "http") + ":" + imageUrl;
      } else if (imageUrl.startsWith("/")) {
        imageUrl = ((isHttps) ? "https" : "http") + "://" + domain + imageUrl;
      }
    }

    return imageUrl;
  }

  private static String getDomain(Document document, String raccourcisUrl) {
    String url = getMetaTagText(document, "base", "href");
    if (isBlank(url)) {
      url = getMetaTagText(document, "link[rel=canonical]", "href");
    }
    if (isBlank(url)) {
      url = getMetaTagText(document, "meta[property=og:url]", "content");
    }
    if (isBlank(url)) {
      url = raccourcisUrl;
    }
    String domain = url;
    try {
      domain = InternetDomainName.from(new URL(url).getHost()).topPrivateDomain().toString();
    } catch (Exception e) {
    }

    return domain;
  }

  private static String getFavIconUrl(Document document, String domain, String raccourcisUrl) {
    String favIconUrl = getMetaTagText(document, "link[rel=shortcut icon]", "href");
    if (isBlank(favIconUrl)) {
      favIconUrl = getMetaTagText(document, "link[rel=icon]", "href");
    }
    if (isBlank(favIconUrl)) {
      favIconUrl = getMetaTagText(document, "link[rel=apple-touch-icon]", "href");
    }
    if (isBlank(favIconUrl)) {
      favIconUrl = getMetaTagText(document, "link[rel=apple-touch-icon-precomposed]", "href");
    }
    Boolean isHttps = raccourcisUrl.toLowerCase().startsWith("https");
    if (isBlank(favIconUrl)) {
      favIconUrl = ((isHttps) ? "https" : "http") + "://" + domain + "/favicon.ico";
    }
    if (!(favIconUrl == null || favIconUrl.isEmpty() || favIconUrl.trim().isEmpty())) {
      if (favIconUrl.startsWith("//")) {
        favIconUrl = ((isHttps) ? "https" : "http") + ":" + favIconUrl;
      } else if (favIconUrl.startsWith("/")) {
        favIconUrl = ((isHttps) ? "https" : "http") + "://" + domain + favIconUrl;
      }
    }

    return favIconUrl;
  }

  public static String getBase64Image(String imageURL) {
    String base64Image = "";
    try {
      URL url = new URL(imageURL);
      InputStream is = url.openStream();
      byte[] bytes = IOUtils.toByteArray(is);
      base64Image = Base64.encodeBase64String(bytes);
    } catch (Exception e) {
    }
    return base64Image;
  }

  public static InfoPreviewRaccourcis getInfoPreviewRaccourcis(String raccourcisUrl) throws IOException, InterruptedException {
    if (!raccourcisUrl.startsWith("http")) {
      raccourcisUrl = "http://" + raccourcisUrl;
    }

    Document document = Jsoup.connect(raccourcisUrl)
      .header("Accept", "*/*")
      .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.42")
      .referrer("https://www.google.com")
      .ignoreContentType(true)
      .timeout(10000)
      .get();

    String title = getTitle(document);
    String description = getDescription(document);
    String domain = getDomain(document, raccourcisUrl);
    String imageUrl = getImageUrl(document, raccourcisUrl, domain);
    String ogImageAlt = getMetaTagText(document, "meta[property=og:image:alt]", "content");
    String favIconUrl = getFavIconUrl(document, domain, raccourcisUrl);
    String imageBase64 = getBase64Image(imageUrl);
    String favIconBase64 = getBase64Image(favIconUrl);

    return new InfoPreviewRaccourcis(domain, raccourcisUrl, title, description,
      imageUrl, ogImageAlt, favIconUrl,
      imageBase64, favIconBase64);
  }

  private static String getMetaTagText(Document document, String cssQuery, String attr) {
    Element elm = document.select(cssQuery).first();
    if (elm != null) {
      return elm.attr(attr);
    }
    return "";
  }

  private static String getTagText(Document document, String cssQuery) {
    Element elm = document.getElementsByTag(cssQuery).first();
    return elm != null ? StringUtil.normaliseWhitespace(elm.text()).trim() : "";
  }

  public static List<InfoPreviewFluxNouvellesDto> getInfoPreviewFluxNouvelles(String actuUrl, Integer actuLimit) throws IOException {
    if (!actuUrl.startsWith("http")) {
      actuUrl = "http://" + actuUrl;
    }
    List<InfoPreviewFluxNouvellesDto> actus = new ArrayList<>();

    Document document = Jsoup.connect(actuUrl)
      .header("Accept", "*/*")
      .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.42")
      .referrer("https://www.google.com")
      .ignoreContentType(true)
      .timeout(10000)
      .parser(Parser.xmlParser())
      .get();

    Elements items = document.select("item");
    for (Element it : items)  {
      if ((actuLimit == 0) || (actus.size() < actuLimit)) {
        String title = getTagText(it, "title");
        String raccourcis = getTagText(it, "raccourcis");
        String pubDate = getTagText(it, "pubDate");
        String description = getTagText(it, "description");
        String source = getTagText(it, "source");
        String sourceUrl = getTagAttr(it, "source", "url");
        String imageUrl = getTagAttr(it, "enclosure[type*=image]", "url");
        String imageBase64 = ServicePreview.getBase64Image(imageUrl);

        String favIconUrl = "";
        String favIconBase64 = "";
        if (!sourceUrl.isEmpty()) {
          try {
            InfoPreviewRaccourcis infoPreviewRaccourcis = ServicePreview.getInfoPreviewRaccourcis(sourceUrl);
            favIconUrl = infoPreviewRaccourcis.getFavIconUrl();
            favIconBase64 = infoPreviewRaccourcis.getFavIconBase64();
          }
          catch(Exception e) { }
        }

        actus.add(new InfoPreviewFluxNouvelles(title, raccourcis, pubDate, description, source, sourceUrl, imageUrl, imageBase64, favIconUrl, favIconBase64).toInfoPreviewFluxNouvellesDto());
      }
    }

    return actus;
  }

  private static String getTagAttr(Element item, String cssQuery, String attr) {
    Element elm = item.select(cssQuery).first();
    if (elm != null) {
      return elm.attr(attr);
    }
    return "";
  }

  private static String getTagText(Element item, String cssQuery) {
    Element elm = item.getElementsByTag(cssQuery).first();
    if (elm != null) {
      return elm.text();
    }
    return "";
  }
}
