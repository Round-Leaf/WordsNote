package org.linfeng.wordsnote.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;

@Service
public class EmbeddingService {

    @Value("${siliconflow.api.token}")
    String token = ""; // 替换为你的真实 Token

    public float[] getEmbedding(String word) throws IOException, InterruptedException {
        ObjectMapper mapper = new ObjectMapper();
        String url = "https://api.siliconflow.cn/v1/embeddings";


        HashMap<String,String> payload = new HashMap<>();
        payload.put("model","Qwen/Qwen3-Embedding-0.6B");
        payload.put("input",word);

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + token)
                .POST(HttpRequest.BodyPublishers.ofString(mapper.writeValueAsString(payload)))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("状态码: " + response.statusCode());
        System.out.println("响应体: " + response.body());
        JsonNode rootNode = mapper.readTree(response.body());

        JsonNode embeddingNode = rootNode.path("data").get(0).path("embedding");
        float vector[] = new float[embeddingNode.size()];
        for(int i=0;i<embeddingNode.size();++i){
            vector[i]=embeddingNode.get(i).asFloat();
        }
        return vector;
    }
}
