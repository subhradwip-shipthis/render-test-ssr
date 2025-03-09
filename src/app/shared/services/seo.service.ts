import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { GLOBAL_SEO_CONFIG } from '../../globals/configs/seo';
import { MetaTag, OgTag } from '../../globals/types/types';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private renderer: Renderer2;
  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setSeoConfig(pageKey: string) {
    const defaultConfig = GLOBAL_SEO_CONFIG.default;
    const pageConfig = GLOBAL_SEO_CONFIG.pages[pageKey] || {};
    const config = {
      ...defaultConfig,
      ...pageConfig,
      metaTags: [...defaultConfig.metaTags!, ...(pageConfig.metaTags || [])],
      ogTags: [...defaultConfig.ogTags!, ...(pageConfig.ogTags || [])],
      twitterTags: [...defaultConfig.twitterTags!, ...(pageConfig.twitterTags || [])],
    };

    this.setTitle(config.title);
    this.setMetaTags(config.metaTags);
    this.setOgTags(config.ogTags);
    this.setTwitterTags(config.twitterTags);

    if (config.jsonLdSchema) {
      this.setJsonLdSchema(config.jsonLdSchema);
    }
  }

  private setTitle(title: string) {
    this.titleService.setTitle(title);
  }

  private setMetaTags(tags?: MetaTag[]) {
    tags?.forEach((tag) => {
      this.metaService.updateTag({ name: tag.name, content: tag.content });
    });
  }

  private setOgTags(tags?: OgTag[]) {
    tags?.forEach((tag) => {
      this.metaService.updateTag({ property: tag.property, content: tag.content });
    });
  }

  private setTwitterTags(tags?: MetaTag[]) {
    tags?.forEach((tag) => {
      this.metaService.updateTag({ name: tag.name, content: tag.content });
    });
  }

  private setJsonLdSchema(schema: any) {
    if (!schema) return;

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.renderer.appendChild(this.document.head, script);
  }
}
