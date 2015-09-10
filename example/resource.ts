var res = {
    pack_atlas_json: "res/images-packed/pack.plist",
    pack_atlas_png: "res/images-packed/pack.png",
    sounds_asplode_wav: "res/sounds/asplode.wav",
    sounds_pew_wav: "res/sounds/pew.wav",
    sounds_smallasplode_wav: "res/sounds/smallasplode.wav",
    fonts_hud_fnt: "res/fonts/hud.fnt",
    fonts_hud_0_png: "res/fonts/hud_0.png",
    fonts_normal_fnt: "res/fonts/normal.fnt",
    fonts_normal_0_png: "res/fonts/normal_0.png"    
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}