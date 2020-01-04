
package com.att.sapmp.routes;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.att.sapmp.model.Document;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import org.apache.camel.Exchange;
import org.apache.camel.LoggingLevel;
import org.apache.camel.Processor;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;

public class UpdateMongo extends RouteBuilder {

    public UpdateMongo() {
    }

    @Override
    public void configure() throws Exception {

        from("direct:updateMongo")
        .setHeader("CamelMongoDbOperation", simple("update"))
        .setHeader("CamelMongoDbUpsert", simple("true"))

        .doTry()
        .unmarshal().json(JsonLibrary.Jackson, Document.class)
        .process(new Processor() {
            public void process(final Exchange exchange) throws Exception {
                String id = exchange.getIn().getHeader("documentId", String.class);
                Document d = exchange.getIn().getBody(Document.class);
                String body = d.toString();

                System.out.println("\n\n\n"+body);

                HashMap<String,Object> bodyObject =
                new ObjectMapper().readValue(body, HashMap.class);
        
                DBObject filterField = new BasicDBObject("_id", id);
                DBObject updateObj = new BasicDBObject("$set", bodyObject);
        
                List<DBObject> update = new ArrayList();
                update.add(filterField);
                update.add(updateObj);
        
                exchange.getIn().setBody(update, List.class);
            }
        })
        .setHeader("MongoBody", constant("${body}"))
        .to("direct:callMongo")
        .doCatch(Exception.class)
            .log(LoggingLevel.ERROR, "Exception=${exception.message}")
            .setBody( simple("{\"error\": \"${exception.message}\"}"))
        .doFinally()
            .removeHeader("AJSC_CAET*")
            .marshal().json()
        .end();
    }
}
