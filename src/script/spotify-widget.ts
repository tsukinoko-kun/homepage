class SpotifyCurrentlyPlayingWidget {
  public readonly widgetElement: HTMLAnchorElement;
  public readonly titleElement: HTMLElement;
  public readonly imageElement: HTMLImageElement;

  public constructor() {
    this.widgetElement = document.createElement("a");
    this.widgetElement.target = "_blank";
    this.widgetElement.rel = "noopener noreferrer";
    this.widgetElement.classList.add("spotify-widget");
    this.widgetElement.href =
      "https://open.spotify.com/user/u73d67nen42ugnzo2zucxqotd?si=9f0df48fb51c42f5";

    this.titleElement = document.createElement("span");
    this.widgetElement.appendChild(this.titleElement);

    this.imageElement = document.createElement("img");
    this.widgetElement.appendChild(this.imageElement);

    this.imageElement.addEventListener(
      "error",
      () => {
        this.imageElement.remove();
        this.titleElement.remove();
        this.widgetElement.remove();
      },
      { once: true, passive: true }
    );

    this.imageElement.addEventListener(
      "load",
      () => {
        this.widgetElement.classList.add("loaded");
      },
      { once: true, passive: true }
    );
  }

  public update() {
    let soundWavesColor: string = "1ED760";
    const body = document.body;
    if (body.classList.contains("info")) {
      soundWavesColor = "ff79c6";
    } else if (body.classList.contains("portfolio")) {
      soundWavesColor = "8be9fd";
    } else if (body.classList.contains("links")) {
      soundWavesColor = "f1fa8c";
    }

    const newSrc = `https://spotiwidget.vercel.app/widget?uid=u73d67nen42ugnzo2zucxqotd&theme=natemoo-re&invert_artist_title=true&cover=true&progress_bar=true&progress_color=%23B3B3B3&sound_waves=true&sound_waves_color=%23${soundWavesColor}&background=false`;
    if (newSrc !== this.imageElement.src) {
      this.imageElement.src = newSrc;
    }

    const newTitle: string =
      document.documentElement.lang === "de"
        ? "Auf Spotify hören"
        : "Listening on Spotify";
    if (newTitle !== this.titleElement.innerText) {
      this.titleElement.innerText = newTitle;
    }
  }
}

const widget = new SpotifyCurrentlyPlayingWidget();

const footer = document.getElementsByTagName("footer")[0];
if (footer) {
  document.body.insertBefore(widget.widgetElement, footer);
} else {
  document.body.appendChild(widget.widgetElement);
}

setInterval(() => {
  widget.update();
}, 1000);
