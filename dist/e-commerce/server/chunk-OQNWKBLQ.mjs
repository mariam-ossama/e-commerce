import './polyfills.server.mjs';
import{a as i}from"./chunk-IT7UANVT.mjs";import{w as o}from"./chunk-LYQUDD53.mjs";import{R as e,W as r}from"./chunk-F7B3EIZI.mjs";var n=class t{httpClient=r(o);getAllCategories(){return this.httpClient.get(i.baseUrl+"categories")}static \u0275fac=function(a){return new(a||t)};static \u0275prov=e({token:t,factory:t.\u0275fac,providedIn:"root"})};export{n as a};
