export interface CiNiiResult {
  "@context": Context;
  "@id": string;
  "@type": string;
  title: string;
  description: string;
  link: Link;
  "dc:date": Date;
  "opensearch:totalResults": number;
  "opensearch:startIndex": number;
  "opensearch:itemsPerPage": number;
  items: Item[];
}

export interface Context {
  "@vocab": string;
  rdf: string;
  rdfs: string;
  dc: string;
  prism: string;
  ndl: string;
  opensearch: string;
  cir: string;
  "@language": string;
}

export interface Item {
  "@id": string;
  "@type": ItemType;
  title: string;
  link: Link;
  "rdfs:seeAlso"?: Link;
  "dc:creator"?: string[];
  "dc:type": DcType;
  "prism:publicationName"?: string;
  "prism:issn"?: string;
  "prism:number"?: string;
  "prism:startingPage"?: string;
  "prism:endingPage"?: string;
  "prism:publicationDate"?: string;
  "dc:identifier": DcIdentifier[];
  "prism:volume"?: string;
  "dc:publisher"?: string;
  description?: string;
  "dc:subject"?: string[];
  "dc:source"?: DcSource[];
}

export enum ItemType {
  Item = "item",
}

export interface DcIdentifier {
  "@type": DcIdentifierType;
  "@value": string;
}

export enum DcIdentifierType {
  CIRDOI = "cir:DOI",
  CIRHDL = "cir:HDL",
  CIRISBN = "cir:ISBN",
  CIRKAKEN = "cir:KAKEN",
  CIRLCCN = "cir:LCCN",
  CIRNAID = "cir:NAID",
  CIRNCID = "cir:NCID",
  CIRNDLBIBID = "cir:NDL_BIB_ID",
  CIRURI = "cir:URI",
}

export interface DcSource {
  "@id": string;
  "dc:title"?: string;
}

export enum DcType {
  Article = "Article",
  Book = "Book",
  Dataset = "Dataset",
  Project = "Project",
}

export interface Link {
  "@id": string;
}
