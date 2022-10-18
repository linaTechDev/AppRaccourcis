package com.lina.spring.service;

import com.lina.spring.dtos.FluxNouvellesDto;
import com.lina.spring.models.FluxNouvelles;
import com.lina.spring.models.InfoPreviewRaccourcis;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.parser.Parser;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ServiceActu {
  public static List<FluxNouvellesDto> actuFetcher(String actuUrl, Integer actuLimit) throws IOException {
    if (!actuUrl.startsWith("http")) {
      actuUrl = "http://" + actuUrl;
    }
    List<FluxNouvellesDto> actus = new ArrayList<>();

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

        actus.add(new FluxNouvelles(title, raccourcis, pubDate, description, source, sourceUrl, imageUrl, imageBase64, favIconUrl, favIconBase64).toFluxNouvellesDto());
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
