export class RaccourcisInfo {
  domain: string;
  url: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  favIconUrl: string;
  imageBase64: string;
  favIconBase64: string;

  constructor(domain?: string, url?: string, title?: string, description?: string,
              imageUrl?: string, imageAlt?: string, favIconUrl?: string,
              imageBase64?: string, favIconBase64?: string) {
    this.domain = (domain) ? domain : '';
    this.url = (url) ? url : '';
    this.title = (title) ? title : '';
    this.description = (description) ? description : '';
    this.imageUrl = (imageUrl) ? imageUrl : '';
    this.imageAlt = (imageAlt) ? imageAlt : '';
    this.favIconUrl = (favIconUrl) ? favIconUrl : '';
    this.imageBase64 = (imageBase64) ? imageBase64 : '';
    this.favIconBase64 = (favIconBase64) ? favIconBase64 : '';
  }
}
