export class ActuInfo {
  title: string;
  raccourcis: string;
  pubDate: string;
  description: string;
  source: string;
  sourceUrl: string;
  imageUrl: string;
  imageBase64: string;
  favIconUrl: string;
  favIconBase64: string;

  constructor(title?: string, raccourcis?: string, pubDate? :string,
              description?: string, source?: string, sourceUrl?: string,
              imageUrl?: string, imageBase64?: string,
              favIconUrl?: string, favIconBase64?: string) {
    this.title = (title) ? title : '';
    this.raccourcis = (raccourcis) ? raccourcis : '';
    this.pubDate = (pubDate) ? pubDate : '';
    this.description = (description) ? description : '';
    this.source = (source) ? source : '';
    this.sourceUrl = (sourceUrl) ? sourceUrl : '';
    this.imageUrl = (imageUrl) ? imageUrl : '';
    this.imageBase64 = (imageBase64) ? imageBase64 : '';
    this.favIconUrl = (favIconUrl) ? favIconUrl : '';
    this.favIconBase64 = (favIconBase64) ? favIconBase64 : '';
  }
}
