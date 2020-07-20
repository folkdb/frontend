const renderSvg = (content, {
  offset = [0, 0],
  width = 832,
  ...options
} = {}) => {
  if (window.vextab) {
    const { VexTab, Artist, Vex } = window.vextab;
    const { Renderer } = Vex.Flow;

    const renderer = new Renderer('target', Renderer.Backends.SVG);
    const artist = new Artist(offset[0], offset[1], width, options);
    const tab = new VexTab(artist);

    tab.parse(content);
    artist.render(renderer);
  } else {
    window.setTimeout(
      () => renderSvg(content, { offset, width, ...options }),
      250,
    );
  }
};


export default renderSvg;
