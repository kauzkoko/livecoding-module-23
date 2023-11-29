import { SVG } from "@svgdotjs/svg.js";

export const useTextEllipse = (options) => {
  let text = options.text || "Hello World";
  const x = options.x || 0;
  const y = options.y || 0;
  const r = options.r || 100;
  const speed = options.speed || 0.01;
  const svgId = options.svgId || "mySvg";
  const offset = options.offset || 25;

  useRafFn(() => {
    text.rotate(speed, x, y);
  });

  onMounted(() => {
    var draw = SVG("#mySvg");
    let circlePath;
    circlePath = draw.path(
      `M ${x},${y} m -${r},0 a ${r},${r} 0 1,0 ${2 * r},0 a ${r},${r} 0 1,0 -${
        2 * r
      },0`
    );
    circlePath.fill("none").stroke({ color: "transparent", width: 0 });
    circlePath.attr("id", "circlePath");
    circlePath.plot(
      `M ${x},${y} m -${r},0 a ${r},${r} 0 1,1 ${2 * r},0 a ${r},${r} 0 1,1 -${
        2 * r
      },0`
    );

    text = draw.text(function (add) {
      add.tspan("");
    });

    let textPath = text.path(circlePath);
    textPath.tspan(text);

    textPath.attr("startOffset", offset + "%");
  });

  return 0;
};
