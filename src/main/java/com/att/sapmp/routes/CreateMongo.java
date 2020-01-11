
package com.att.sapmp.routes;

import org.apache.camel.LoggingLevel;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;

public class CreateMongo extends RouteBuilder {

    public CreateMongo() {
    }

    @Override
    public void configure() throws Exception {

        from("direct:createMongo")
        .setHeader("CamelMongoDbOperation", simple("insert"))
        .doTry()
        .unmarshal().json(JsonLibrary.Jackson)
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
