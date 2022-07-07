import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  let sanitizer: DomSanitizer;
  let pipe: SafePipe;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml: (val: string) => val,
            bypassSecurityTrustStyle: (val: string) => val,
            bypassSecurityTrustScript: (val: string) => val,
            bypassSecurityTrustUrl: (val: string) => val,
            bypassSecurityTrustResourceUrl: (val: string) => val,
          },
        },
      ],
    });
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SafePipe(sanitizer);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Testing transform()', () => {
    it('it should return safe HTML', () => {
      const html = '<h1>Title</h1>';
      expect(pipe.transform(html, 'html')).toBe(html);
    });

    it('it should return safe CSS', () => {
      const style = 'background-color: red';
      expect(pipe.transform(style, 'style')).toBe(style);
    });

    it('it should return safe Scripts', () => {
      const script = '<script>alert("hello world")</script>';
      expect(pipe.transform(script, 'script')).toBe(script);
    });

    it('it should return safe URL', () => {
      const url = 'https://website.com';
      expect(pipe.transform(url, 'url')).toBe(url);
    });

    it('it should return safe resourceUrl', () => {
      const resourceUrl = '../img/image.jpg';
      expect(pipe.transform(resourceUrl, 'resourceUrl')).toBe(resourceUrl);
    });

    it('it should throwError if type not recognised', () => {
      const resourceUrl = '../img/image.jpg';
      expect(() => pipe.transform(resourceUrl, 'image')).toThrow(
        new Error('Invalid safe type specified: image')
      );
    });
  });
});
