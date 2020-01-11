
package com.att.sapmp.routes;

import org.apache.camel.LoggingLevel;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.dataformat.JsonLibrary;

public class UpdateMongo extends RouteBuilder {

    public UpdateMongo() {
    }

    @Override
    public void configure() throws Exception {

        from("direct:updateMongo")
        .setHeader("CamelMongoDbOperation", simple("save"))
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
