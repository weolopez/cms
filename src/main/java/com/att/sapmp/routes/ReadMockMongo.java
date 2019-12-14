
package com.att.sapmp.routes;

import com.att.sapmp.model.Document;
import com.mongodb.DBObject;

import org.apache.camel.Exchange;
import org.apache.camel.LoggingLevel;
import org.apache.camel.Processor;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.mongodb.MongoDbConstants;
import org.apache.camel.model.dataformat.JsonLibrary;

public class ReadMockMongo extends RouteBuilder {

    public ReadMockMongo() {
    }

    @Override
    public void configure() throws Exception {
        from("direct:readMockMongo")
        .setHeader(MongoDbConstants.FIELDS_PROJECTION, simple("{body: 1, _id: 0}"))
        .setHeader("CamelMongoDbOperation", simple("findById"))
        .setBody( simple("${headers.documentId}") )
        .doTry()
            .to("direct:callMongo")
        .doCatch(Exception.class)
            .log(LoggingLevel.ERROR, "Exception=${exception.message}")
            .setBody( simple("{\"error\": \"${headers.error_text}\"}"))
        .doFinally()
            .removeHeader("AJSC_CAET*")

        .process(new Processor() {
            public void process(final Exchange e) throws Exception {
                e.getIn().setBody(e.getIn().getBody(DBObject.class).get("body"));
            }
        })
        .end();
    }
}
