import './polyfills.server.mjs';
import{a as i}from"./chunk-IT7UANVT.mjs";import{w as n}from"./chunk-LYQUDD53.mjs";import{R as r,W as o}from"./chunk-F7B3EIZI.mjs";var a=class t{httpClient=o(n);getAllProducts(e=1){return this.httpClient.get(i.baseUrl+`products?page=${e}`)}static \u0275fac=function(p){return new(p||t)};static \u0275prov=r({token:t,factory:t.\u0275fac,providedIn:"root"})};export{a};
