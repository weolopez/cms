
package com.att.sapmp.routes;

import com.att.sapmp.model.Document;
import com.mongodb.DBObject;

import org.apache.camel.Exchange;
import org.apache.camel.LoggingLevel;
import org.apache.camel.Processor;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.mongodb.MongoDbConstants;
import org.apache.camel.model.dataformat.JsonLibrary;

public class ReadMongo extends RouteBuilder {

    public ReadMongo() {
    }

    @Override
    public void configure() throws Exception {
        from("direct:readMongo")
        .doTry()
            .to("direct:callMongo")
        .doCatch(Exception.class)
            .log(LoggingLevel.ERROR, "Exception=${exception.message}")
            .setBody( simple("{\"error\": \"${headers.error_text}\"}"))
        .doFinally()
            .removeHeader("AJSC_CAET*")
        .marshal().json()
        .end();
    }
}
