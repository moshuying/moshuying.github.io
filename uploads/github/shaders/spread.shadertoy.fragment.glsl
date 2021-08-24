float steper(float fStep,float add){
    return smoothstep(0.,fStep,mod(iTime+add, fStep))*fStep+0.001;
    //return .9;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ){
    //vec2 uv = (vUv*4.)-vec2(2.,2.);

    vec2 uv = (2.0*fragCoord.xy-iResolution.xy)/iResolution.y;

    float timer=steper(3.,0.);
    //float timer = 1.9;
    float radius=2.0/timer;
    float width=timer*10.0;
    float ring=length(vec2(uv.x, uv.y))*radius*width-width;
    ring=min(2.0, abs(1.0/(10.0*ring)));
    ring=max(0.0, ring-timer);
    vec3 rings=vec3(ring, ring*.5, 0);

    timer=steper(3.,.15);
    radius=1.3/timer;
    width=timer*5.;
    ring=length(vec2(uv.x, uv.y))*radius*width-width;
    ring=min(2.0, abs(1.0/(10.0*ring)));
    ring=max(0.0, ring-timer);
    rings+=vec3(ring, ring*.5, 0);


    fragColor = vec4(rings,1.0);
}