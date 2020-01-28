package com.att.sapmp.rest;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.mongodb.MongoDbConstants;

import org.apache.camel.Processor;
import org.apache.camel.Exchange;
import com.mongodb.DBObject;
import com.mongodb.BasicDBObject;
import org.apache.camel.model.dataformat.JsonLibrary;
import com.mongodb.util.JSON;
/**
 * Create Read Update Delete Operations for 
 * CMS Document Resource in MongoDB
 */
public class RestAPIs extends RouteBuilder {
    public RestAPIs() {
    }

    @Override
    public void configure() throws Exception {

        from("rest:post:/cms/v1/{CamelMongoDbCollection}/{documentId}")
        .to("direct:createMongo");

        from("rest:get:/cms/v1/{CamelMongoDbCollection}/{documentId}")
        .setHeader("CamelMongoDbOperation", simple("findById"))
        .setBody( simple("${headers.documentId}") )
        .to("direct:readMongo")
        // .marshal().json()
        // .unmarshal().json(JsonLibrary.Jackson)
        .process(new Processor() {
            public void process(final Exchange e) throws Exception {
                DBObject basicDBObject = (DBObject) JSON.parse(e.getIn().getBody(String.class));
                String outString = basicDBObject.get("body").toString();
                e.getIn().setBody(outString);
            }
        });


        from("rest:get:/cms/v1/{CamelMongoDbCollection}")
        .setHeader(MongoDbConstants.FIELDS_PROJECTION, simple("{_id: 1}"))
        .setHeader("CamelMongoDbOperation", simple("findAll"))
        .setBody( simple("{}{}") )
        .to("direct:readMongo");

        from("rest:put:/cms/v1/{CamelMongoDbCollection}/{documentId}")
        .to("direct:updateMongo");

        from("rest:delete:/cms/v1/{CamelMongoDbCollection}/{documentId}")
        .to("direct:deleteMongo");

    }
}
