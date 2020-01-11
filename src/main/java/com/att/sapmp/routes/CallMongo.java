package com.att.sapmp.routes;

import org.apache.camel.builder.RouteBuilder;

public class CallMongo extends RouteBuilder {

    public CallMongo() { }

    @Override
    public void configure() throws Exception {
        from("direct:callMongo")
        .setHeader("CamelMongoDbCollection", simple("${headers.CamelMongoDbCollection}"))
        .setHeader("CamelMongoDbDatabase", simple("local"))
        .to("mongodb:mongoBean?database=ignore&collection=ignore&dynamicity=true");
    }
}
