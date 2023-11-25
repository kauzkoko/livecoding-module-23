let metaballShaderFile = {
  vertex: `attribute vec3 aPosition;
        uniform float width;
        uniform float height;
        varying highp vec2 vPos;
  
        void main() {
          gl_Position = vec4(aPosition, 1.0);
          vPos = vec2(
            (gl_Position.x + 1.) / 2. * width,
            (gl_Position.y + 1.) / 2. * height);
        }`,
  fragment: `precision highp float;
  
        #define BALLS 13
  
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
  
          if (sum > 11.) {
            gl_FragColor = vec4(vec3(0.), 1.);
          } else {
            gl_FragColor = vec4(vec3(1.), 1.);
          }
        }`,
};
