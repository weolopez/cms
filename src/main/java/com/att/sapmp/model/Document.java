
package com.att.sapmp.model;

import java.util.ArrayList;
import java.util.Objects;

import io.quarkus.runtime.annotations.RegisterForReflection;

/**
 * A REST entity representing a fruit.
 */
@RegisterForReflection // Lets Quarkus register this class for reflection during the native build
public class Document {
    private String _id;
    private String body;
     ArrayList<Object>headers;

    public Document() {
    }

    public Document(String _id, String body,   ArrayList<Object>headers) {
        this._id = _id;
        this.body = body;
        this.headers = headers;
    }

    public String get_id() {
        return _id;
    }

    public Document echo(Document b) {
        return b;
    }

    public Document set_id(String _id) {
        this._id = _id;
        return this;
    }

    public String getbody() {
        return this.body;
    }

    public void setheaders( ArrayList<Object>headers) {
        this.headers = headers;
    }

    public  ArrayList<Object>getheaders() {
        return this.headers;
    }

    public void setbody(String body) {
        this.body = body;
    }
    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Document)) {
            return false;
        }

        Document other = (Document) obj;

        return Objects.equals(other._id, this._id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this._id);
    }
    @Override
    public String toString() {

        System.out.println( getbody() );
        return "{\"body\": \"" + getbody() + "\"}";
    }
}