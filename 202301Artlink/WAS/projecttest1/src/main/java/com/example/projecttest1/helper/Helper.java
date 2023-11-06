package com.example.projecttest1.helper;

import com.example.projecttest1.dto.NearbyDto;
import com.example.projecttest1.exception.django.DjangoFailedException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@Component
public class Helper {
    public static String getJsonStringFromMap(Map<String, Object> map) throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonStr = objectMapper.writeValueAsString(map);
        return jsonStr;
    }

    public static int postSendMsg(String pathurl, Map<String, Object> msg) throws Exception {
        URL url = new URL(pathurl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("POST");
        String postData = getJsonStringFromMap(msg);
        System.out.println(postData);
        byte[] postDataBytes = postData.getBytes(StandardCharsets.UTF_8);


        conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        conn.setRequestProperty("Content-Length", String.valueOf(postData.length()));
        conn.setDoOutput(true);

        OutputStream outputStream = conn.getOutputStream();
        outputStream.write(postDataBytes);
        outputStream.flush();
        outputStream.close();

        conn.connect();
        int responseCode = conn.getResponseCode();
        System.out.println(responseCode);
        conn.disconnect();
        return responseCode;
    }

    public static int putSendMsg(String pathurl, Map<String, Object> msg) throws Exception {
        URL url = new URL(pathurl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("PUT");
        String postData = getJsonStringFromMap(msg);
        byte[] postDataBytes = postData.getBytes(StandardCharsets.UTF_8);


        conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        conn.setRequestProperty("Content-Length", String.valueOf(postData.length()));
        conn.setDoOutput(true);

        OutputStream outputStream = conn.getOutputStream();
        outputStream.write(postDataBytes);
        outputStream.flush();
        outputStream.close();

        conn.connect();
        int responseCode = conn.getResponseCode();

        conn.disconnect();
        return responseCode;
    }

    public static Map<String, Object> getSendMsg(String pathurl) throws Exception {
        URL url = new URL(pathurl);
        System.out.println("Done");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("GET");
        //장고 서버 연결
        try {
            conn.connect();

            int responseCode = conn.getResponseCode();

            //응답이 성공적이지 않다면 장고 서버 종료 후 에러 발생.
            if(responseCode != 200){
                conn.disconnect();
                throw new DjangoFailedException("Failed to connect Django");
            }

            //응답 내용 뜯어보기.
            InputStream inputStream = conn.getInputStream();
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            String line;

            StringBuilder response = new StringBuilder();

            while ((line = bufferedReader.readLine()) != null) {
                response.append(line);
            }

            bufferedReader.close();
            conn.disconnect();
            System.out.println(responseCode);

            //응답을 String형으로 변환
            String responseString = response.toString();
            System.out.println(responseString);

            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = mapper.readValue(responseString, Map.class);
            return map;
        }catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }
}
