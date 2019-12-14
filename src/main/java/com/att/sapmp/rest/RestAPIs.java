package com.att.sapmp.rest;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.mongodb.MongoDbConstants;

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
        .to("direct:readMongo");

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
