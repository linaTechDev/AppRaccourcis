package com.lina.spring.service;

import com.lina.spring.models.MeteoActuelle;
import com.lina.spring.models.MeteoWidget;
import com.lina.spring.models.PrevisionMeteo;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.entity.BufferedHttpEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class ServiceMeteo {

  private static final String OPEN_METEO_API_KEY = "02d29048d4117bd0af3f012201bc0aa1";
  private static final String METEO_URL = "http://api.openweathermap.org/data/2.5/onecall?lat=45.5088&lon=-73.5878&exclude=minutely,hourly,alerts&units=metric&lang=fr";
  private static final String METEO_ICON_URL = "http://openweathermap.org/img/wn/";
  private static final String METEO_APIID_END = "&APPID=" + OPEN_METEO_API_KEY;
  private static final DateTimeFormatter dateFormaterFromDate = DateTimeFormatter.ofPattern("dd/MM");
  private static final DateTimeFormatter dayFormaterFromDate = DateTimeFormatter.ofPattern("EEE");
  private static final Integer FORCAST_LIMIT = 5;

  private static String getMeteoIconURL(JSONObject meteo) throws JSONException {
    String iconCode = meteo.getString("icon");
    return METEO_ICON_URL + iconCode + "@2x.png";

  }


  public static MeteoWidget getMeteo() {
    MeteoWidget meteo;

    try {
      JSONObject jsonObject = null;

      String completURL = METEO_URL + METEO_APIID_END;
      CloseableHttpClient client = HttpClientBuilder.create().setSSLHostnameVerifier(new NoopHostnameVerifier()).build();
      HttpGet request = new HttpGet(completURL);
      HttpResponse response = client.execute(request);

      if (response.getStatusLine().getStatusCode() == 200) {
        HttpEntity ht = response.getEntity();
        BufferedHttpEntity buf = new BufferedHttpEntity(ht);
        String responseString = EntityUtils.toString(buf, "UTF-8");
        if (responseString.isEmpty()) {
          jsonObject = null;
        } else {
          jsonObject = new JSONObject(responseString);
        }
      }

      if (jsonObject != null) {

        MeteoActuelle meteoActuelle = getMeteoActuelle(jsonObject);

        if (meteoActuelle.errorMessage.isEmpty()) {
          PrevisionMeteo[] previsionMeteo = getPrevisionMeteo(jsonObject);

          if (previsionMeteo[0].errorMessage.isEmpty()) {

            meteo = new MeteoWidget(meteoActuelle, previsionMeteo);

          } else {
            meteo = new MeteoWidget(previsionMeteo[0].errorMessage);
          }

        } else {
          meteo = new MeteoWidget(meteoActuelle.errorMessage);
        }

      } else {
        meteo = new MeteoWidget(response.getStatusLine().getReasonPhrase());
      }
    } catch (Exception e) {
      meteo = new MeteoWidget(e.getMessage());
    }

    return meteo;
  }


  private static MeteoActuelle getMeteoActuelle(JSONObject jsonObject) {
    MeteoActuelle meteoActuelle;

    try {
      JSONObject current = jsonObject.getJSONObject("current");
      JSONObject actuelleMeteo = current.getJSONArray("weather").getJSONObject(0);
      String meteoIconURL = getMeteoIconURL(actuelleMeteo);
      String meteoIconBase64 = ServicePreview.getBase64Image(meteoIconURL);
      String temp = ((int) current.getDouble("temp")) + "";
      String feelsLike = ((int) current.getDouble("feels_like")) + "";
      String cloudiness = current.getInt("clouds") + "%";
      String meteoDesc = actuelleMeteo.getString("description");

      meteoActuelle = new MeteoActuelle(
        meteoDesc,
        meteoIconURL,
        meteoIconBase64,
        cloudiness,
        temp,
        feelsLike
      );
    } catch (Exception e) {
      meteoActuelle = new MeteoActuelle(e.getMessage());
    }

    return meteoActuelle;
  }

  private static PrevisionMeteo[] getPrevisionMeteo(JSONObject jsonObject) {
    List<PrevisionMeteo> PrevisionMeteoSemaine = new ArrayList<>();

    try {
      JSONArray daily = jsonObject.getJSONArray("daily");

      for (int i = 0; (i < daily.length()) && (i < FORCAST_LIMIT); i++) {
        JSONObject dayJSON = daily.getJSONObject(i);

        if (dayJSON != null) {
          LocalDate dayDate = Instant.ofEpochSecond(dayJSON.getLong("dt")).atZone(ZoneId.systemDefault()).toLocalDate();
          String date = dateFormaterFromDate.format(dayDate);
          String dayOfWeek = "Auj";
          if (i > 0) {
            dayOfWeek = dayFormaterFromDate.format(dayDate);
            dayOfWeek = StringUtils.left(dayOfWeek, 3);
            dayOfWeek = StringUtils.capitalize(dayOfWeek);
          }
          String dayTempMax = ((int) dayJSON.getJSONObject("temp").getDouble("max")) + "";
          String dayTempMin = ((int) dayJSON.getJSONObject("temp").getDouble("min")) + "";
          JSONObject jourMeteoObjet = dayJSON.getJSONArray("weather").getJSONObject(0);
          String meteoIconURL = getMeteoIconURL(dayJSON.getJSONArray("weather").getJSONObject(0));
          String meteoIconBase64 = ServicePreview.getBase64Image(meteoIconURL);
          String jourMeteoDesc = jourMeteoObjet.getString("description");

          PrevisionMeteo previsionMeteoQuotidien = new PrevisionMeteo(
            dayOfWeek,
            date,
            jourMeteoDesc,
            meteoIconURL,
            meteoIconBase64,
            dayTempMax,
            dayTempMin
          );
          PrevisionMeteoSemaine.add(previsionMeteoQuotidien);
        }
      }

    } catch (Exception e) {
      PrevisionMeteo previsionMeteoQuotidien = new PrevisionMeteo(e.getMessage());
      PrevisionMeteoSemaine.add(previsionMeteoQuotidien);
    }

    PrevisionMeteo[] previsionMeteo;
    previsionMeteo = PrevisionMeteoSemaine.toArray(new PrevisionMeteo[0]);
    return previsionMeteo;
  }
}
