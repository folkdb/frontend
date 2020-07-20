const renderSvg = (content) => {
  if (window.vextab) {
    const { VexTab, Artist, Vex } = window.vextab;
    const { Renderer } = Vex.Flow;

    const renderer = new Renderer('target', Renderer.Backends.SVG);
    const artist = new Artist(offset[0], offset[1], width, options);
    const tab = new VexTab(artist);

    try {
      tab.parse(content);
      artist.render(renderer);
    } catch (err) {
      parseError = err.message || err;
    }
  } else {
    window.setTimeout(renderSvg, 250);
  }
};


export default renderSvg;
