
package com.att.sapmp.routes;

import com.att.sapmp.model.Document;

import org.apache.camel.Exchange;
import org.apache.camel.LoggingLevel;
import org.apache.camel.Processor;
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
        .unmarshal().json(JsonLibrary.Jackson, Document.class)
        .process(new Processor() {
            public void process(final Exchange e) throws Exception {
                Document d = e.getIn().getBody(Document.class);
                d.set_id(e.getIn().getHeader("documentId", String.class));
                e.getIn().setBody(d);
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
