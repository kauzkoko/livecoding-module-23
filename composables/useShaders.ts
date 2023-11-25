export const useShaders = (options: { balls: number; color: [] }) => {
  let balls = options.balls ?? 5;
  let color = options.color ?? [0.0, 0.0, 0.0, 1];

  let vertexShader = `attribute vec3 aPosition;
          uniform float width;
          uniform float height;
          varying highp vec2 vPos;
    
          void main() {
            gl_Position = vec4(aPosition, 1.0);
            vPos = vec2(
              (gl_Position.x + 1.) / 2. * width,
              (gl_Position.y + 1.) / 2. * height);
          }`;

  let fragmentShader = `precision highp float;
    
          #define BALLS ${balls}
    
          uniform float xs[BALLS];
          uniform float ys[BALLS];
          uniform float rs[BALLS];
    
          varying highp vec2 vPos;
    
          void main() {
            float sum = 0.;
      
            for (int i = 0; i < BALLS; i++) {
              float dx = xs[i] - vPos.x;
              float dy = ys[i] - vPos.y;
              float d = length(vec2(dx, dy));
              sum += rs[i] / d;
            }
    
            if (sum > 16.) {
              gl_FragColor = vec4(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]});
            } else {
              gl_FragColor = vec4(vec3(1.), .0);
            }
          }`;
  return { fragmentShader, vertexShader };
};
