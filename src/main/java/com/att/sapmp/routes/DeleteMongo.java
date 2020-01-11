
package com.att.sapmp.routes;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import org.apache.camel.Exchange;
import org.apache.camel.LoggingLevel;
import org.apache.camel.Processor;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;

public class DeleteMongo extends RouteBuilder {

    public DeleteMongo() {
    }

    @Override
    public void configure() throws Exception {
        from("direct:deleteMongo")
        .setHeader("CamelMongoDbOperation", simple("remove"))
        .doTry()
        .process(new Processor() {
            public void process(final Exchange exchange) throws Exception {
                String id = exchange.getIn().getHeader("documentId", String.class);
        
                DBObject filterField = new BasicDBObject("_id", id);
                exchange.getIn().setBody(filterField, BasicDBObject.class);
            }
        })
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
