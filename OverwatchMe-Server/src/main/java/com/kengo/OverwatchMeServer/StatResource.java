package com.kengo.OverwatchMeServer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api")
public class StatResource {

    public String apiUrl = "https://public-api.tracker.gg/v2/overwatch/standard/profile/";
    public String apiKey = "b92f295f-b1be-40ce-8b48-fc080fedf90d";

    Map<String, String> params = new HashMap<String, String>();


    //Works for psn and xbl, not for battlenet
    @GetMapping(value="getStats/{platform}/{playerId}")
    public ResponseEntity<String> getStats(@PathVariable("platform") String platform,
                                           @PathVariable("playerId") String playerId){
        try{
            params.put("id", "%23");
            for(int i=0; i < playerId.length() ; i++){
                if(playerId.charAt(i)=='-'){
                    String[] Arr = playerId.split("-");
                    playerId = Arr[0] + "{hash}" + Arr[1];
                }
            }

            RestTemplate restTemplate = new RestTemplate();
//            HttpHeaders headers = new HttpHeaders();
//            headers.add("TRN-Api-Key",apiKey);
//            headers.add("Accept", "application/json");
//            headers.add("Accept-Encoding", "gzip");
            String compositeUrl = apiUrl + platform + "/" + playerId +"?TRN-Api-Key=" + apiKey;
            System.out.println("Retrieving from: " + compositeUrl);
            compositeUrl = compositeUrl.replace("{hash}","%23");
            URI uri = new URI(compositeUrl);
            String stats = restTemplate.getForObject(
                    uri, String.class);
            return new ResponseEntity<String>(stats, HttpStatus.OK);
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    //Working Apex Get Method

//    public String apexUrl = "https://public-api.tracker.gg/v2/apex/standard/profile/";
//    @GetMapping(value="api/{platform}/{playerId}")
//    public ResponseEntity<String> getStats(@PathVariable("platform") String platform,
//                                           @PathVariable("playerId") String playerId){
//        RestTemplate restTemplate = new RestTemplate();
//        String stats = restTemplate.getForObject(
//                apexUrl + platform + "/" + playerId + "?TRN-Api-Key=" + apiKey, String.class);
//
//        return new ResponseEntity<String>(stats, HttpStatus.OK);
//    }
}
