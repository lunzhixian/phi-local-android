window.__B19_TPL=(function(){var $imports={
  $escape:function(c){var s=(c===undefined||c===null)?'':String(c);return s.replace(/["&'<>]/g,function(ch){return {'"':'&#34;','&':'&amp;',"'":'&#39;','<':'&lt;','>':'&gt;'}[ch];});},
  $each:function(d,cb){if(Array.isArray(d)){for(var i=0;i<d.length;i++)cb(d[i],i);}else{for(var k in d)cb(d[k],k);}}
};return (function($data){
'use strict'
$data=$data||{}
var $$out='',$$line=[0,0],$escape=$imports.$escape,_res_path=$data._res_path,theme=$data.theme,themeInfo=$data.themeInfo,renderNoJs=$data.renderNoJs,element=$data.element,elem=$data.elem,displayMode=$data.displayMode,mode=$data.mode,bodyClass=$data.bodyClass,sys=$data.sys,background=$data.background,gameuser=$data.gameuser,Date=$data.Date,spInfo=$data.spInfo,$each=$imports.$each,v=$data.v,$index=$data.$index,stats=$data.stats,i=$data.i,phi=$data.phi,song=$data.song,b19_list=$data.b19_list,b30Analysis=$data.b30Analysis,grid=$data.grid,axis=$data.axis,category=$data.category,tag=$data.tag,tick=$data.tick,slot=$data.slot,_plugin=$data._plugin,Version=$data.Version,pvis=$data.pvis,method=$data.method,nowrap=$data.nowrap,useFontMetrics=$data.useFontMetrics,staticFlakes=$data.staticFlakes,index=$data.index,staticThemeTexts=$data.staticThemeTexts,text=$data.text
try{
$$out+="<!DOCTYPE html>\r\n<html lang=\"zh-cn\">\r\n\r\n<head>\r\n    <meta charset=\"utf-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width\">\r\n    <link rel=\"shortcut icon\" href=\"#\" />\r\n    <link rel=\"stylesheet\" type=\"text/css\" href=\""
$$line=[7,49]
$$out+=$escape(_res_path)
$$out+="html/common/common.css\" />\r\n    \r\n    "
$$line=[9,4]
if(theme == "snow"){
$$out+="\r\n    <link rel=\"stylesheet\" href=\""
$$line=[10,33]
$$out+=$escape(_res_path)
$$out+="html/common/theme/snow/snow.css\">\r\n    "
$$line=[11,4]
}else if(theme == "topText" || theme == "foolsDay"){
$$out+="\r\n    <link rel=\"stylesheet\" href=\""
$$line=[12,33]
$$out+=$escape(_res_path)
$$out+="html/common/theme/topText/topText.css\">\r\n    "
$$line=[13,4]
}
$$out+="\r\n\r\n    \r\n"
$$line=[16,0]
if(themeInfo && themeInfo.cssUrl && themeInfo.cssMode == "replace"){
$$out+="\r\n<link rel=\"stylesheet\" href=\""
$$line=[17,29]
$$out+=$escape(themeInfo.cssUrl)
$$out+="\">\r\n"
$$line=[18,0]
}else{
$$out+="\r\n<link rel=\"stylesheet\" href=\""
$$line=[19,29]
$$out+=$escape(_res_path)
$$out+="html/b19/b19.css\">\r\n"
$$line=[20,0]
if(renderNoJs){
$$out+="\r\n<style>\r\n    /* 中文 Chromium 的小号字体关键字最低为 12px，静态引擎需要显式值。 */\r\n    .num p, .Nosignal .client p { font-size: 12px; }\r\n</style>\r\n"
$$line=[25,0]
}
$$out+="\r\n"
$$line=[26,0]
}
$$out+="\r\n\r\n\r\n    "
$$line=[29,4]
if(themeInfo && themeInfo.cssUrl && themeInfo.cssMode == "overlay"){
$$out+="\r\n    <link rel=\"stylesheet\" href=\""
$$line=[30,33]
$$out+=$escape(themeInfo.cssUrl)
$$out+="\">\r\n    "
$$line=[31,4]
}
$$out+="\r\n\r\n    "
$$line=[33,4]
if(themeInfo){
$$out+="\r\n    <!-- 清单中的颜色和字体置于页面/主题 CSS 之后，保证清单配置优先。 -->\r\n    <style>\r\n        "
$$line=[36,8]
if(themeInfo.fontUrl){
$$out+="\r\n        @font-face { font-family: \"phi-theme\"; src: url(\""
$$line=[37,57]
$$out+=themeInfo.fontUrl
$$out+="\") format(\"truetype\"); }\r\n        "
$$line=[38,8]
}
$$out+="\r\n        "
$$line=[39,8]
if(themeInfo.colors){
$$out+="\r\n        :root {\r\n            "
$$line=[41,12]
if(themeInfo.colors.AT){
$$out+="--AT: "
$$line=[41,44]
$$out+=$escape(themeInfo.colors.AT)
$$out+="; --phi-theme-AT: "
$$line=[41,85]
$$out+=$escape(themeInfo.colors.AT)
$$out+="; --phi-theme-AT-dark: color-mix(in srgb, "
$$line=[41,150]
$$out+=$escape(themeInfo.colors.AT)
$$out+=" 50%, black);"
$$line=[41,186]
}
$$out+="\r\n            "
$$line=[42,12]
if(themeInfo.colors.IN){
$$out+="--IN: "
$$line=[42,44]
$$out+=$escape(themeInfo.colors.IN)
$$out+="; --phi-theme-IN: "
$$line=[42,85]
$$out+=$escape(themeInfo.colors.IN)
$$out+="; --phi-theme-IN-dark: color-mix(in srgb, "
$$line=[42,150]
$$out+=$escape(themeInfo.colors.IN)
$$out+=" 50%, black);"
$$line=[42,186]
}
$$out+="\r\n            "
$$line=[43,12]
if(themeInfo.colors.HD){
$$out+="--HD: "
$$line=[43,44]
$$out+=$escape(themeInfo.colors.HD)
$$out+="; --phi-theme-HD: "
$$line=[43,85]
$$out+=$escape(themeInfo.colors.HD)
$$out+="; --phi-theme-HD-dark: color-mix(in srgb, "
$$line=[43,150]
$$out+=$escape(themeInfo.colors.HD)
$$out+=" 50%, black);"
$$line=[43,186]
}
$$out+="\r\n            "
$$line=[44,12]
if(themeInfo.colors.EZ){
$$out+="--EZ: "
$$line=[44,44]
$$out+=$escape(themeInfo.colors.EZ)
$$out+="; --phi-theme-EZ: "
$$line=[44,85]
$$out+=$escape(themeInfo.colors.EZ)
$$out+="; --phi-theme-EZ-dark: color-mix(in srgb, "
$$line=[44,150]
$$out+=$escape(themeInfo.colors.EZ)
$$out+=" 50%, black);"
$$line=[44,186]
}
$$out+="\r\n        }\r\n        "
$$line=[46,8]
}
$$out+="\r\n        "
$$line=[47,8]
if(themeInfo.fontUrl){
$$out+="\r\n        body { font-family: \"phi-theme\", \"PHI\", \"NOTO\", \"NotoSansJP\", \"HIMALAYA\", \"NotoSansMath-Regular\"; }\r\n        "
$$line=[49,8]
}
$$out+="\r\n        "
$$line=[50,8]
if(themeInfo.backgroundUrl){
$$out+="\r\n        body > .background:not(.theme-background) { display: none; }\r\n        "
$$line=[52,8]
}
$$out+="\r\n    </style>\r\n    "
$$line=[54,4]
}
$$out+="\r\n    "
$$line=[55,4]
if(renderNoJs){
$$out+="\r\n    <style>\r\n        /* 页面保留自己的换行规则；只有显式声明的固定标题栏允许单行省略。 */\r\n        body [name=\"pvis\"] { min-width: 0; max-width: 100%; }\r\n        body .phi-fit-line[name=\"pvis\"] { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\r\n        .phi-static-theme { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: -1; }\r\n        .phi-static-stars {\r\n            background-image: radial-gradient(circle, #fff9 1px, transparent 2px), radial-gradient(circle, #9dd7ff88 1px, transparent 2px), radial-gradient(circle, #fff6 1.5px, transparent 3px);\r\n            background-size: 131px 173px, 227px 193px, 367px 293px;\r\n            background-position: 31px 47px, 97px 131px, 173px 53px;\r\n        }\r\n        .phi-static-theme .snow { width: 2.5%; }\r\n        .phi-static-theme .snow img { width: 100%; }\r\n        .phi-static-theme.topTextBox p { font-size: 18px; opacity: .35; filter: blur(1px); }\r\n        body > canvas#stars, body > .snow-box, body > .topTextBox:not(.phi-static-theme) { display: none; }\r\n    </style>\r\n    "
$$line=[71,4]
}
$$out+="\r\n    <title>phi-plugin</title>\r\n</head>\r\n\r\n<body class=\"elem-"
$$line=[75,18]
$$out+=$escape(element || elem || `hydro`)
$$out+=" "
$$line=[75,49]
$$out+=$escape(displayMode || mode || `default`)
$$out+="-mode  "
$$line=[75,92]
$$out+=$escape(bodyClass)
$$out+="\" "
$$line=[75,107]
$$out+=sys.scale
$$out+=">\r\n\r\n\r\n    <div class=\"background theme-background\">\r\n        "
$$line=[79,8]
if(themeInfo && themeInfo.backgroundUrl){
$$out+="\r\n        <img src=\""
$$line=[80,18]
$$out+=$escape(themeInfo.backgroundUrl)
$$out+="\" alt=\"主题背景\"\r\n            style=\"object-fit: cover; min-width: 100%;\">\r\n        "
$$line=[82,8]
}else if(theme == "star"){
$$out+="\r\n        <img src=\""
$$line=[83,18]
$$out+=$escape(_res_path)
$$out+="html/otherimg/Star1.png\" alt=\"曲绘-模糊\">\r\n        <img src=\""
$$line=[84,18]
$$out+=$escape(_res_path)
$$out+="html/otherimg/Star2.png\" alt=\"曲绘-模糊\"\r\n            style=\"min-height: 0;width: 100%;height: auto;bottom: 0;filter: none;\">\r\n        "
$$line=[86,8]
}else{
$$out+="\r\n        "
$$line=[87,8]
if(background){
$$out+="\r\n        <img src=\""
$$line=[88,18]
$$out+=$escape(background)
$$out+="\" alt=\"曲绘-模糊\">\r\n        "
$$line=[89,8]
}else{
$$out+="\r\n        <img src=\""
$$line=[90,18]
$$out+=$escape(_res_path)
$$out+="html/otherimg/phigros.png\" alt=\"曲绘-模糊\">\r\n        "
$$line=[91,8]
}
$$out+="\r\n        "
$$line=[92,8]
}
$$out+="\r\n    </div>\r\n\r\n    "
$$line=[95,4]
if(!renderNoJs){
$$out+="\r\n    <script>\r\n        var _res_path = \""
$$line=[97,25]
$$out+=$escape(_res_path)
$$out+="\";\r\n    </script>\r\n\r\n    "
$$line=[100,4]
if(theme == "snow"){
$$out+="\r\n    <script src=\""
$$line=[101,17]
$$out+=$escape(_res_path)
$$out+="html/common/theme/snow/snow.js\"></script>\r\n    "
$$line=[102,4]
}else if(theme == "topText" || theme == "foolsDay"){
$$out+="\r\n    <script src=\""
$$line=[103,17]
$$out+=$escape(_res_path)
$$out+="html/common/theme/topText/topText.js\"></script>\r\n    "
$$line=[104,4]
}else if(theme == "star"){
$$out+="\r\n    <script src=\""
$$line=[105,17]
$$out+=$escape(_res_path)
$$out+="html/common/theme/star/star.js\"></script>\r\n    "
$$line=[106,4]
}
$$out+="\r\n    "
$$line=[107,4]
}
$$out+="\r\n\r\n    <!-- <div class=\"container\" id=\"container\"> -->\r\n    \r\n\r\n<div class=\"title\">\r\n    <div class=\"playerInfo\">\r\n        <div class=\"blackBlock clip-box\"></div>\r\n        <div class=\"avatar clip-box\">\r\n            <img src=\""
$$line=[116,22]
$$out+=$escape(_res_path)
$$out+="html/avatar/"
$$line=[116,47]
$$out+=$escape(gameuser.avatar)
$$out+=".png\" alt=\""
$$line=[116,77]
$$out+=$escape(gameuser.avatar)
$$out+="\">\r\n        </div>\r\n        <div class=\"playerId\">\r\n            <p name=\"pvis\""
$$line=[119,26]
if(renderNoJs){
$$out+=" class=\"phi-fit-line\" title=\""
$$line=[119,72]
$$out+=$escape(gameuser.PlayerId)
$$out+="\""
$$line=[119,94]
}
$$out+=">"
$$line=[119,102]
$$out+=gameuser.PlayerId
$$out+="</p>\r\n        </div>\r\n        <div class=\"rks clip-box\">\r\n            <p>"
$$line=[122,15]
$$out+=$escape(gameuser.rks.toFixed(4))
$$out+="</p>\r\n        </div>\r\n        <div class=\"clgBox\">\r\n            <div class=\"Challenge\">\r\n            <img src=\""
$$line=[126,22]
$$out+=$escape(_res_path)
$$out+="html/otherimg/"
$$line=[126,49]
$$out+=$escape(gameuser.ChallengeMode)
$$out+=".png\" alt=\"Challenge\">\r\n            <p>"
$$line=[127,15]
$$out+=$escape(gameuser.ChallengeModeRank)
$$out+="</p>\r\n            </div>\r\n        </div>\r\n        <div class=\"date\">\r\n            <p>"
$$line=[131,15]
$$out+=$escape(Date)
$$out+="</p>\r\n        </div>\r\n        <div class=\"dataBox clip-box\">\r\n            <img src=\""
$$line=[134,22]
$$out+=$escape(_res_path)
$$out+="html/otherimg/data.png\" alt=\"data\">\r\n            <p>"
$$line=[135,15]
$$out+=$escape(gameuser.data)
$$out+="</p>\r\n        </div>\r\n        "
$$line=[137,8]
if(spInfo){
$$out+="\r\n        <div class=\"spInfoBox\">\r\n            "
$$line=[139,12]
$each(spInfo,function(v,$index){
$$out+="\r\n            <div class=\"spInfo colorful-background clip-box\">\r\n                <p>"
$$line=[141,19]
$$out+=$escape(v)
$$out+="</p>\r\n            </div>\r\n            "
$$line=[143,12]
})
$$out+="\r\n        </div>\r\n        "
$$line=[145,8]
}
$$out+="\r\n    </div>\r\n    <div class=\"recordInfo clip-box\">\r\n        <div class=\"whiteLine clip-box\"></div>\r\n        <div class=\"sheet\">\r\n            <div class=\"row\">\r\n                <div class=\"poz\">\r\n                    <p>\\</p>\r\n                </div>\r\n                "
$$line=[154,16]
$each(stats,function(v,i){
$$out+="\r\n                <div class=\"poz\">\r\n                    <p>"
$$line=[156,23]
$$out+=$escape(v.title)
$$out+="</p>\r\n                </div>\r\n                "
$$line=[158,16]
})
$$out+="\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"poz\">\r\n                    <p>C</p>\r\n                </div>\r\n                "
$$line=[164,16]
$each(stats,function(v,i){
$$out+="\r\n                <div class=\"poz\">\r\n                    <p>"
$$line=[166,23]
$$out+=$escape(v.cleared)
$$out+="</p>\r\n                </div>\r\n                "
$$line=[168,16]
})
$$out+="\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"poz\">\r\n                    <p>FC</p>\r\n                </div>\r\n                "
$$line=[174,16]
$each(stats,function(v,i){
$$out+="\r\n                <div class=\"poz\">\r\n                    <p>"
$$line=[176,23]
$$out+=$escape(v.fc)
$$out+="</p>\r\n                </div>\r\n                "
$$line=[178,16]
})
$$out+="\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"poz\">\r\n                    <p>Phi</p>\r\n                </div>\r\n                "
$$line=[184,16]
$each(stats,function(v,i){
$$out+="\r\n                <div class=\"poz\">\r\n                    <p>"
$$line=[186,23]
$$out+=$escape(v.phi)
$$out+="</p>\r\n                </div>\r\n                "
$$line=[188,16]
})
$$out+="\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"b19\">\r\n    "
$$line=[194,4]
if(phi){
$$out+="\r\n\r\n    "
$$line=[196,4]
$each(phi,function(song,$index){
$$out+="\r\n\r\n    "
$$line=[198,4]
if(song){
$$out+="\r\n\r\n\r\n    <div class=\"song phi_song\">\r\n        <div class=\"ill-box\">\r\n            <div class=\"num clip-box\">\r\n                <p name=\"pvis\">P"
$$line=[204,32]
$$out+=$escape($index+1)
$$out+="</p>\r\n            </div>\r\n            <div class=\"ill clip-box\">\r\n                <img src=\""
$$line=[207,26]
$$out+=$escape(song.illustration)
$$out+="\" alt=\"ill\">\r\n            </div>\r\n            <div class=\"rank-"
$$line=[209,29]
$$out+=$escape(song.rank)
$$out+=" clip-box\">\r\n                <div class=\"org\">\r\n                    <p>"
$$line=[211,23]
$$out+=$escape(song.rank)
$$out+="&ensp;"
$$line=[211,42]
$$out+=$escape(song.difficulty.toFixed(1))
$$out+="</p>\r\n                </div>\r\n                <div class=\"rel\">\r\n                    <p>"
$$line=[214,23]
$$out+=$escape(song.rks.toFixed(2))
$$out+="</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"info-"
$$line=[218,25]
$$out+=$escape(song.rank)
$$out+="\">\r\n            <div class=\"songname\">\r\n                <p name=\"pvis\""
$$line=[220,30]
if(renderNoJs){
$$out+=" class=\"phi-fit-line\" title=\""
$$line=[220,76]
$$out+=$escape(song.song)
$$out+="\""
$$line=[220,90]
}
$$out+=">"
$$line=[220,98]
$$out+=$escape(song.song)
$$out+="</p>\r\n            </div>\r\n            <div class=\"songinfo\">\r\n                <div class=\"Rating\">\r\n                    <img src=\""
$$line=[224,30]
$$out+=$escape(themeInfo && themeInfo.icons && themeInfo.icons[song.Rating] ? themeInfo.icons[song.Rating] : (_res_path + 'html/otherimg/' + song.Rating + '.png'))
$$out+="\" alt=\""
$$line=[224,188]
$$out+=$escape(song.Rating)
$$out+="\">\r\n                </div>\r\n                <div class=\"chengji\">\r\n                    <div class=\"score\">\r\n                        <p>"
$$line=[228,27]
$$out+=$escape(song.score)
$$out+="</p>\r\n                    </div>\r\n                    <div class=\"line\"></div>\r\n                    <div class=\"acc-box\">\r\n                        <div class=\"acc\">\r\n                            <p>"
$$line=[233,31]
$$out+=$escape(song.acc.toFixed(2))
$$out+="%</p>\r\n                        </div>\r\n                        <div class=\"suggest suggest-kind-"
$$line=[235,57]
$$out+=$escape(song.suggestType)
$$out+="\">\r\n                            <div class=\"suggest-tip\"></div>\r\n                            <p>"
$$line=[237,31]
$$out+=$escape(song.suggest)
$$out+="</p>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        "
$$line=[243,8]
if(song.accAvg){
$$out+="\r\n        <div class=\"accAvg acc"
$$line=[244,30]
$$out+=$escape(song.accKind)
$$out+=" clip-box\">\r\n            <div class=\"accAvgLine clip-box\"></div>\r\n            <svg viewBox=\"0 0 1024 1024\">\r\n            "
$$line=[247,12]
if(song.accKind == 'Finished'){
$$out+="\r\n            <path\r\n            d=\"M892.064 261.888a31.936 31.936 0 0 0-45.216 1.472L421.664 717.248l-220.448-185.216a32 32 0 1 0-41.152 48.992l243.648 204.704a31.872 31.872 0 0 0 20.576 7.488 31.808 31.808 0 0 0 23.36-10.112L893.536 307.136a32 32 0 0 0-1.472-45.248z\"\r\n            p-id=\"5526\"\r\n            ></path>\r\n            "
$$line=[252,12]
}else{
$$out+="\r\n            <path\r\n                d=\"M564.8 465.184l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z m0-256l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z\"\r\n                fill=\"#333333\"\r\n                p-id=\"1589\"\r\n            ></path>\r\n            "
$$line=[258,12]
}
$$out+="\r\n            </svg>\r\n            <p>Avg: "
$$line=[260,20]
$$out+=$escape(song.accAvg.toFixed(4))
$$out+="%</p>\r\n        </div>\r\n        "
$$line=[262,8]
}
$$out+="\r\n        "
$$line=[263,8]
if(song.cpToOld){
$$out+="\r\n        <div class=\"cpToOld acc"
$$line=[264,31]
$$out+=$escape(song.cpToOld.type)
$$out+=" clip-box-left\">\r\n            <p>Dif</p>\r\n            <svg viewBox=\"0 0 1024 1024\">\r\n            <path\r\n                d=\"M564.8 465.184l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z m0-256l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z\"\r\n                fill=\"#333333\"\r\n                p-id=\"1589\"\r\n            ></path>\r\n            </svg>\r\n            <p>"
$$line=[273,15]
$$out+=$escape(song.cpToOld.dif)
$$out+="&ensp;&ensp;&ensp;RKS</p>\r\n            <svg viewBox=\"0 0 1024 1024\">\r\n            <path\r\n                d=\"M564.8 465.184l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z m0-256l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z\"\r\n                fill=\"#333333\"\r\n                p-id=\"1589\"\r\n            ></path>\r\n            </svg>\r\n            <p>"
$$line=[281,15]
$$out+=$escape(song.cpToOld.rks)
$$out+="</p>\r\n        </div>\r\n        "
$$line=[283,8]
}
$$out+="\r\n    </div>\r\n\r\n    "
$$line=[286,4]
}else{
$$out+="\r\n\r\n    <div class=\"Nosignal\">\r\n        <div class=\"border_corner border_corner_left_top\"></div>\r\n        <div class=\"border_corner border_corner_right_top\"></div>\r\n        <div class=\"border_corner border_corner_left_bottom\"></div>\r\n        <div class=\"border_corner border_corner_right_bottom\"></div>\r\n        <div class=\"line\"></div>\r\n        <div class=\"timeout\">\r\n            <p>TIME_OUT</p>\r\n        </div>\r\n        <div class=\"client\">\r\n            <p>>>> PhigrOS Client Finding Phi.score</p>\r\n        </div>\r\n        <div class=\"sqrt\"></div>\r\n    </div>\r\n\r\n    "
$$line=[303,4]
}
$$out+="\r\n\r\n    "
$$line=[305,4]
})
$$out+="\r\n\r\n    "
$$line=[307,4]
}
$$out+="\r\n\r\n\r\n    "
$$line=[310,4]
$each(b19_list,function(song,$index){
$$out+="\r\n    \r\n    "
$$line=[312,4]
if($index == (phi ? 27 : 30)){
$$out+="\r\n    <div class=\"over_flow\">\r\n        <div class=\"flow_line_box_l\">\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n        </div>\r\n        <p><i>OVER FLOW</i></p>\r\n        <div class=\"flow_line_box_r\">\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n        </div>\r\n    </div>\r\n    "
$$line=[332,4]
}
$$out+="\r\n\r\n\r\n    <div class=\"song "
$$line=[335,21]
$$out+=$escape($index < (phi ? 27 : 30) ? 'b_song':'')
$$out+="\">\r\n        <div class=\"ill-box\">\r\n            <div class=\"num clip-box\">\r\n                <p name=\"pvis\">#"
$$line=[338,32]
$$out+=$escape(song.num)
$$out+="</p>\r\n            </div>\r\n            <div class=\"ill clip-box\">\r\n                <img src=\""
$$line=[341,26]
$$out+=$escape(song.illustration)
$$out+="\" alt=\"ill\">\r\n            </div>\r\n            <div class=\"rank-"
$$line=[343,29]
$$out+=$escape(song.rank)
$$out+=" clip-box\">\r\n                <div class=\"org\">\r\n                    <p>"
$$line=[345,23]
$$out+=$escape(song.rank)
$$out+="&ensp;"
$$line=[345,42]
$$out+=$escape(song.difficulty.toFixed(1))
$$out+="</p>\r\n                </div>\r\n                <div class=\"rel\">\r\n                    <p>"
$$line=[348,23]
$$out+=$escape(song.rks.toFixed(2))
$$out+="</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"info-"
$$line=[352,25]
$$out+=$escape(song.rank)
$$out+="\">\r\n            <div class=\"songname\">\r\n                <p name=\"pvis\""
$$line=[354,30]
if(renderNoJs){
$$out+=" class=\"phi-fit-line\" title=\""
$$line=[354,76]
$$out+=$escape(song.song)
$$out+="\""
$$line=[354,90]
}
$$out+=">"
$$line=[354,98]
$$out+=$escape(song.song)
$$out+="</p>\r\n            </div>\r\n            <div class=\"songinfo\">\r\n                <div class=\"Rating\">\r\n                    <img src=\""
$$line=[358,30]
$$out+=$escape(themeInfo && themeInfo.icons && themeInfo.icons[song.Rating] ? themeInfo.icons[song.Rating] : (_res_path + 'html/otherimg/' + song.Rating + '.png'))
$$out+="\" alt=\""
$$line=[358,188]
$$out+=$escape(song.Rating)
$$out+="\">\r\n                </div>\r\n                <div class=\"chengji\">\r\n                    <div class=\"score\">\r\n                        <p>"
$$line=[362,27]
$$out+=$escape(song.score)
$$out+="</p>\r\n                    </div>\r\n                    <div class=\"line\"></div>\r\n                    <div class=\"acc-box\">\r\n                        <div class=\"acc\">\r\n                            <p>"
$$line=[367,31]
$$out+=$escape(song.acc.toFixed(2))
$$out+="%</p>\r\n                        </div>\r\n                        <div class=\"suggest suggest-kind-"
$$line=[369,57]
$$out+=$escape(song.suggestType)
$$out+="\">\r\n                            <div class=\"suggest-tip\"></div>\r\n                            <p>"
$$line=[371,31]
$$out+=$escape(song.suggest)
$$out+="</p>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n            \r\n        "
$$line=[378,8]
if(song.accAvg){
$$out+="\r\n        <div class=\"accAvg acc"
$$line=[379,30]
$$out+=$escape(song.accKind)
$$out+=" clip-box\">\r\n            <div class=\"accAvgLine clip-box\"></div>\r\n            <svg viewBox=\"0 0 1024 1024\">\r\n            "
$$line=[382,12]
if(song.accKind == 'Finished'){
$$out+="\r\n            <path\r\n            d=\"M892.064 261.888a31.936 31.936 0 0 0-45.216 1.472L421.664 717.248l-220.448-185.216a32 32 0 1 0-41.152 48.992l243.648 204.704a31.872 31.872 0 0 0 20.576 7.488 31.808 31.808 0 0 0 23.36-10.112L893.536 307.136a32 32 0 0 0-1.472-45.248z\"\r\n            p-id=\"5526\"\r\n            ></path>\r\n            "
$$line=[387,12]
}else{
$$out+="\r\n            <path\r\n                d=\"M564.8 465.184l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z m0-256l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z\"\r\n                fill=\"#333333\"\r\n                p-id=\"1589\"\r\n            ></path>\r\n            "
$$line=[393,12]
}
$$out+="\r\n            </svg>\r\n            <p>"
$$line=[395,15]
$$out+=$escape(song.accAvg)
$$out+="</p>\r\n        </div>\r\n        "
$$line=[397,8]
}
$$out+="\r\n        "
$$line=[398,8]
if(song.cpToOld){
$$out+="\r\n        <div class=\"cpToOld acc"
$$line=[399,31]
$$out+=$escape(song.cpToOld.type)
$$out+=" clip-box-left\">\r\n            <p>Dif</p>\r\n            <svg viewBox=\"0 0 1024 1024\">\r\n            <path\r\n                d=\"M564.8 465.184l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z m0-256l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z\"\r\n                fill=\"#333333\"\r\n                p-id=\"1589\"\r\n            ></path>\r\n            </svg>\r\n            <p>"
$$line=[408,15]
$$out+=$escape(song.cpToOld.dif)
$$out+="&ensp;&ensp;&ensp;RKS</p>\r\n            <svg viewBox=\"0 0 1024 1024\">\r\n            <path\r\n                d=\"M564.8 465.184l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z m0-256l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z\"\r\n                fill=\"#333333\"\r\n                p-id=\"1589\"\r\n            ></path>\r\n            </svg>\r\n            <p>"
$$line=[416,15]
$$out+=$escape(song.cpToOld.rks)
$$out+="</p>\r\n        </div>\r\n        "
$$line=[418,8]
}
$$out+="\r\n    </div>\r\n\r\n    "
$$line=[421,4]
})
$$out+="\r\n\r\n</div>\r\n"
$$line=[424,0]
if(b30Analysis){
$$out+="\r\n<div class=\"over_flow\">\r\n    <div class=\"flow_line_box_l\">\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n    </div>\r\n    <p><i>B30 数据分析</i></p>\r\n    <div class=\"flow_line_box_r\">\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"b30-analysis-row "
$$line=[445,29]
if(b30Analysis.histogramWide){
$$out+="histogram-wide"
$$line=[445,75]
}
$$out+="\">\r\n    "
$$line=[446,4]
if(b30Analysis.showTags){
$$out+="\r\n    <section class=\"analysis-panel tag-analysis-panel clip-box\">\r\n        <div class=\"analysis-panel-head\">\r\n            <div>\r\n                <p class=\"analysis-kicker\">CHART PROFILE</p>\r\n                <p class=\"analysis-title\">谱面实力分析</p>\r\n            </div>\r\n            <p class=\"analysis-meta\">"
$$line=[453,37]
if(b30Analysis.tagAnalysis && b30Analysis.tagAnalysis.threshold != null){
$$out+="RKS≥"
$$line=[453,116]
$$out+=$escape(b30Analysis.tagAnalysis.threshold.toFixed(1))
$$out+=" · 成绩 "
$$line=[453,170]
$$out+=$escape(b30Analysis.tagAnalysis.recordCount)
$$out+=" · 选票 "
$$line=[453,215]
$$out+=$escape(b30Analysis.tagAnalysis.totalVotes)
$$line=[453,253]
}else if(b30Analysis.tagAnalysis){
$$out+="有效票 "
$$line=[453,292]
$$out+=$escape(b30Analysis.tagAnalysis.totalVotes)
$$line=[453,330]
}else{
$$out+="暂无数据"
$$line=[453,342]
}
$$out+="</p>\r\n        </div>\r\n        <div class=\"tag-analysis-body "
$$line=[455,38]
if(!b30Analysis.tagAnalysis || b30Analysis.tagAnalysis.insufficient){
$$out+="is-insufficient"
$$line=[455,124]
}
$$out+="\">\r\n            <div class=\"tag-analysis-content\">\r\n                <div class=\"tag-radar-column\">\r\n                    <div class=\"tag-radar-title\"><span></span><p>分类汇总</p></div>\r\n                    "
$$line=[459,20]
if(b30Analysis.tagAnalysis && b30Analysis.tagAnalysis.radar.categories.length){
$$out+="\r\n                    <svg class=\"tag-radar\" viewBox=\"0 0 200 184\" aria-label=\"分类标签能力雷达图\">\r\n                        "
$$line=[461,24]
$each(b30Analysis.tagAnalysis.radar.grids,function(grid,$index){
$$out+="\r\n                        <polygon class=\"tag-radar-grid\" points=\""
$$line=[462,64]
$$out+=$escape(grid)
$$out+="\"></polygon>\r\n                        "
$$line=[463,24]
})
$$out+="\r\n                        "
$$line=[464,24]
$each(b30Analysis.tagAnalysis.radar.axes,function(axis,$index){
$$out+="\r\n                        <line class=\"tag-radar-axis\" x1=\"100\" y1=\"92\" x2=\""
$$line=[465,74]
$$out+=$escape(axis.x)
$$out+="\" y2=\""
$$line=[465,90]
$$out+=$escape(axis.y)
$$out+="\"></line>\r\n                        "
$$line=[466,24]
})
$$out+="\r\n                        <polygon class=\"tag-radar-shape\" points=\""
$$line=[467,65]
$$out+=$escape(b30Analysis.tagAnalysis.radar.points)
$$out+="\"></polygon>\r\n                        "
$$line=[468,24]
$each(b30Analysis.tagAnalysis.radar.categories,function(category,$index){
$$out+="\r\n                        <circle class=\"tag-radar-point\" cx=\""
$$line=[469,60]
$$out+=$escape(category.pointX)
$$out+="\" cy=\""
$$line=[469,85]
$$out+=$escape(category.pointY)
$$out+="\" r=\"2.3\"></circle>\r\n                        <text class=\"tag-radar-label\" x=\""
$$line=[470,57]
$$out+=$escape(category.labelX)
$$out+="\" y=\""
$$line=[470,81]
$$out+=$escape(category.labelY)
$$out+="\" text-anchor=\""
$$line=[470,115]
$$out+=$escape(category.anchor)
$$out+="\">\r\n                            <tspan x=\""
$$line=[471,38]
$$out+=$escape(category.labelX)
$$out+="\">"
$$line=[471,59]
$$out+=$escape(category.name)
$$out+="</tspan>\r\n                            <tspan class=\"tag-radar-score\" x=\""
$$line=[472,62]
$$out+=$escape(category.labelX)
$$out+="\" dy=\"10\">"
$$line=[472,91]
$$out+=$escape(category.displayRks)
$$out+="</tspan>\r\n                        </text>\r\n                        "
$$line=[474,24]
})
$$out+="\r\n                    </svg>\r\n                    "
$$line=[476,20]
}
$$out+="\r\n                </div>\r\n                <div class=\"tag-ranking-column\">\r\n                    <div class=\"tag-ranking-group strong-tags\">\r\n                        <div class=\"tag-column-title\"><span></span><p>擅长词条</p></div>\r\n                        "
$$line=[481,24]
if(b30Analysis.tagAnalysis){
$$out+="\r\n                        "
$$line=[482,24]
$each(b30Analysis.tagAnalysis.strong,function(tag,$index){
$$out+="\r\n                        <div class=\"tag-result-row\">\r\n                            <p class=\"tag-rank\">"
$$line=[484,48]
$$out+=$escape($index + 1)
$$out+="</p>\r\n                            <p class=\"tag-name\">"
$$line=[485,48]
$$out+=$escape(tag.name)
$$out+="</p>\r\n                            <p class=\"tag-rks\">"
$$line=[486,47]
$$out+=$escape(tag.rks.toFixed(2))
$$out+="</p>\r\n                        </div>\r\n                        "
$$line=[488,24]
})
$$out+="\r\n                        "
$$line=[489,24]
}
$$out+="\r\n                    </div>\r\n                    <div class=\"tag-ranking-group weak-tags\">\r\n                        <div class=\"tag-column-title\"><span></span><p>薄弱词条</p></div>\r\n                        "
$$line=[493,24]
if(b30Analysis.tagAnalysis){
$$out+="\r\n                        "
$$line=[494,24]
$each(b30Analysis.tagAnalysis.weak,function(tag,$index){
$$out+="\r\n                        <div class=\"tag-result-row\">\r\n                            <p class=\"tag-rank\">"
$$line=[496,48]
$$out+=$escape($index + 1)
$$out+="</p>\r\n                            <p class=\"tag-name\">"
$$line=[497,48]
$$out+=$escape(tag.name)
$$out+="</p>\r\n                            <p class=\"tag-rks\">"
$$line=[498,47]
$$out+=$escape(tag.rks.toFixed(2))
$$out+="</p>\r\n                        </div>\r\n                        "
$$line=[500,24]
})
$$out+="\r\n                        "
$$line=[501,24]
}
$$out+="\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            "
$$line=[505,12]
if(!b30Analysis.tagAnalysis || b30Analysis.tagAnalysis.insufficient){
$$out+="\r\n            <div class=\"tag-insufficient-message\">\r\n                <p>维度标签体系参考自 @空游小站（kyou.net.cn）</p>\r\n                <p>有效选票或逐标签成绩样本不足，请前往 phib19.top 或使用 /settag 进行谱面标签投票</p>\r\n            </div>\r\n            "
$$line=[510,12]
}
$$out+="\r\n        </div>\r\n        "
$$line=[512,8]
if(b30Analysis.tagAnalysis && !b30Analysis.tagAnalysis.insufficient){
$$out+="\r\n        <div class=\"tag-analysis-tip\">\r\n            <p>维度标签体系参考自 @空游小站（kyou.net.cn）</p>\r\n            <p>谱面投票可前往 phib19.top 或使用 /settag 指令提交</p>\r\n        </div>\r\n        "
$$line=[517,8]
}
$$out+="\r\n    </section>\r\n    "
$$line=[519,4]
}
$$out+="\r\n\r\n    <section class=\"analysis-panel histogram-panel clip-box\">\r\n        <div class=\"analysis-panel-head\">\r\n            <div>\r\n                <p class=\"analysis-kicker\">RKS DISTRIBUTION</p>\r\n                <p class=\"analysis-title\">等效 RKS 直方图</p>\r\n            </div>\r\n            <div class=\"histogram-summary\">\r\n                <p>平均 RKS</p>\r\n                <p>"
$$line=[529,19]
$$out+=$escape(b30Analysis.histogram.average.toFixed(4))
$$out+="</p>\r\n            </div>\r\n        </div>\r\n        <div class=\"histogram-chart\">\r\n            <div class=\"histogram-y-label\">等效单曲 RKS</div>\r\n            <div class=\"histogram-plot\">\r\n                <div class=\"histogram-scale\">\r\n                    "
$$line=[536,20]
$each(b30Analysis.histogram.ticks,function(tick,$index){
$$out+="\r\n                    <div class=\"histogram-grid-line\" style=\"bottom: "
$$line=[537,68]
$$out+=$escape(tick.position)
$$out+="%;\"><p>"
$$line=[537,92]
$$out+=$escape(tick.label)
$$out+="</p></div>\r\n                    "
$$line=[538,20]
})
$$out+="\r\n                    <div class=\"average-marker\" style=\"bottom: "
$$line=[539,63]
$$out+=$escape(b30Analysis.histogram.averagePosition)
$$out+="%;\"><p>AVG "
$$line=[539,115]
$$out+=$escape(b30Analysis.histogram.average.toFixed(4))
$$out+="</p></div>\r\n                </div>\r\n                <div class=\"histogram-bars\">\r\n                    "
$$line=[542,20]
$each(b30Analysis.histogram.slots,function(slot,$index){
$$out+="\r\n                    <div class=\"histogram-slot\">\r\n                        <div class=\"histogram-bar-area\">\r\n                            <div class=\"histogram-bar "
$$line=[545,54]
$$out+=$escape(slot.kind == 'phi' ? 'phi-bar' : 'best-bar')
$$out+="\" style=\"height: "
$$line=[545,118]
$$out+=$escape(slot.height)
$$out+="%;\"></div>\r\n                        </div>\r\n                        <p class=\"histogram-slot-label\">"
$$line=[547,56]
$$out+=$escape(slot.label)
$$out+="</p>\r\n                    </div>\r\n                    "
$$line=[549,20]
})
$$out+="\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"histogram-legend\">\r\n            <p><span class=\"legend-dot phi-dot\"></span>P1-P3</p>\r\n            <p><span class=\"legend-dot best-dot\"></span>B1-B27</p>\r\n            <p>"
$$line=[556,15]
$$out+=$escape(b30Analysis.histogram.count)
$$out+=" 个有效槽位</p>\r\n        </div>\r\n    </section>\r\n</div>\r\n"
$$line=[560,0]
}
$$out+="\r\n<div class=\"createdbox\">\r\n    <div class=\"phi-plugin\">\r\n        <p>"
$$line=[563,11]
$$out+=$escape(_plugin)
$$out+="</p>\r\n    </div>\r\n    <div class=\"ver\">\r\n        <p>"
$$line=[566,11]
$$out+=$escape(Version.ver)
$$out+="</p>\r\n    </div>\r\n</div>\r\n<div class=\"copyright\">\r\n    <p>*Phi-Plugin不是Phigros官方项目，与南京鸽游网络有限公司及Phigros官方不存在授权、合作或运营关系。\r\n    </p>\r\n</div>\r\n\r\n"
$$line=[574,0]
if(theme == "snow"){
$$out+="\r\n<div class=\"snow-box\"> </div>\r\n<script>\r\n    themeSnow();\r\n</script>\r\n"
$$line=[579,0]
}else if(theme == "topText" || theme == "foolsDay"){
$$out+="\r\n<div class=\"topTextBox\" id=\"topTextBox\"></div>\r\n<script>\r\n    themeTopText();\r\n</script>\r\n"
$$line=[584,0]
}else if(theme == "star"){
$$out+="\r\n<canvas id=\"stars\"></canvas>\r\n<script>\r\n    themeStar();\r\n</script>\r\n"
$$line=[589,0]
}
$$out+="\r\n\r\n\n"
$$line=[592,0]
var pvis = ({
    default: false,
    '.playerId': [306, 64, 32, 18, null, { method: 'pvis', nowrap: true, useFontMetrics: !(themeInfo && themeInfo.fontUrl) }],
    '.songname': [168, 23, 15, 11, null, { method: 'pvis', nowrap: true, useFontMetrics: !(themeInfo && themeInfo.fontUrl) }]
})
$$out+="\r\n    "
$$line=[597,4]
if(renderNoJs){
$$out+="\r\n    "
$$line=[598,4]
if(theme == "star"){
$$out+="\r\n    <div class=\"phi-static-theme phi-static-stars\" aria-hidden=\"true\"></div>\r\n    "
$$line=[600,4]
}else if(theme == "snow"){
$$out+="\r\n    <div class=\"phi-static-theme\" aria-hidden=\"true\">\r\n        "
$$line=[602,8]
var staticFlakes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
$$out+="\r\n        "
$$line=[603,8]
$each(staticFlakes,function(index,$index){
$$out+="\r\n        <div class=\"snow\" style=\"left: "
$$line=[604,39]
$$out+=$escape((index * 37 + 11) % 100)
$$out+="%; top: "
$$line=[604,74]
$$out+=$escape((index * 23 + 7) % 100)
$$out+="%; transform: rotate("
$$line=[604,121]
$$out+=$escape(index * 47)
$$out+="deg); opacity: .6;\">\r\n            <img src=\""
$$line=[605,22]
$$out+=$escape(_res_path)
$$out+="html/otherimg/snow"
$$line=[605,53]
$$out+=$escape(index % 4 + 1)
$$out+=".png\" alt=\"\">\r\n        </div>\r\n        "
$$line=[607,8]
})
$$out+="\r\n    </div>\r\n    "
$$line=[609,4]
}else if(theme == "topText" || theme == "foolsDay"){
$$out+="\r\n    <div class=\"phi-static-theme topTextBox\" aria-hidden=\"true\">\r\n        "
$$line=[611,8]
var staticThemeTexts = ['等待超时，请稍后重试QAQ!', '渲染失败QAQ!', '格式错误QAQ!', '未找到符合条件的谱面QAQ!', '更新失败QAQ!', '未找到存档QAQ!', '等待超时，请稍后重试QAQ!', '格式错误QAQ!']
$$out+="\r\n        "
$$line=[612,8]
$each(staticThemeTexts,function(text,index){
$$out+="\r\n        <p style=\"left: "
$$line=[613,24]
$$out+=$escape((index * 37 + 5) % 90)
$$out+="%; top: "
$$line=[613,57]
$$out+=$escape((index * 23 + 5) % 75)
$$out+="%;\">"
$$line=[613,86]
$$out+=$escape(text)
$$out+="</p>\r\n        "
$$line=[614,8]
})
$$out+="\r\n    </div>\r\n    "
$$line=[616,4]
}
$$out+="\r\n    "
$$line=[617,4]
}
$$out+="\r\n    <!-- <div class=\"copyright\">"
$$line=[618,32]
$$out+=sys.copyright
$$out+="</div> -->\r\n    <!-- </div> -->\r\n    <!-- 曲目名称自适应name-box的宽度 -->\r\n\r\n    "
$$line=[622,4]
if(!renderNoJs){
$$out+="\r\n    <script>\r\n        function isBiggerThanParent(songName, parentElement) {\r\n            console.log(songName, parentElement)\r\n            console.log(songName.scrollWidth, parentElement.offsetWidth, songName.scrollHeight, parentElement.offsetHeight)\r\n            return songName.scrollWidth > parentElement.offsetWidth || songName.scrollHeight > parentElement.offsetHeight\r\n        }\r\n        const originalFontStyles = new WeakMap();\r\n        function adjustFontSize() {\r\n            //获取p元素\r\n            let a = document.getElementsByName('pvis')\r\n            for (let i = 0; i < a.length; ++i) {\r\n\r\n                let songName = a[i]\r\n\r\n                if (!songName) continue\r\n\r\n                // 每次按模板原字号重新测，避免先用回退字体缩小后无法恢复。\r\n                if (!originalFontStyles.has(songName)) originalFontStyles.set(songName, songName.style.fontSize);\r\n                else songName.style.fontSize = originalFontStyles.get(songName);\r\n\r\n                /*调整曲目名称字体大小*/\r\n                let parentElement = songName.parentElement\r\n\r\n                if (!isBiggerThanParent(songName, parentElement)) continue\r\n\r\n                let fontSize = Number(window.getComputedStyle(songName, null).getPropertyValue('font-size').replace(\"px\", \"\"));\r\n\r\n                let l = 0, r = fontSize;\r\n                while (l < r) {\r\n                    let mid = Math.floor((l + r + 1) / 2);\r\n                    songName.style.fontSize = mid + \"px\";\r\n                    if (isBiggerThanParent(songName, parentElement)) {\r\n                        r = mid - 1;\r\n                    } else {\r\n                        l = mid;\r\n                    }\r\n                }\r\n                songName.style.fontSize = l + \"px\";\r\n            }\r\n\r\n        }\r\n        \r\n        // 将颜色转为半透明（用于虚线）\r\n        function lightenColor(hex, alpha = 0.4) {\r\n          // 支持 #RRGGBB 格式\r\n          const r = parseInt(hex.slice(1, 3), 16)\r\n          const g = parseInt(hex.slice(3, 5), 16)\r\n          const b = parseInt(hex.slice(5, 7), 16)\r\n          return `rgba(${r},${g},${b},${alpha})`\r\n        }\r\n\r\n        // 绘制定数变化折线图的函数\r\n        // lines: { data: [{x, xLabel, visX, y, yLabel, visY}], color: string }[]\r\n        function drawDifficultyChart(svgId, lines) {\r\n          // 获取SVG元素\r\n          const svg = document.getElementById(svgId)\r\n          if (!svg) {\r\n            console.error(\"SVG元素未找到:\", svgId)\r\n            return\r\n          }\r\n\r\n          // 清空SVG内容\r\n          svg.innerHTML = \"\"\r\n\r\n          // 设置SVG尺寸\r\n          const width = parseInt(svg.getAttribute(\"width\")) || 800\r\n          const height = parseInt(svg.getAttribute(\"height\")) || 400\r\n\r\n          // 定义边距\r\n          const margin = { top: 30, right: 30, bottom: 50, left: 60 }\r\n          const innerWidth = width - margin.left - margin.right\r\n          const innerHeight = height - margin.top - margin.bottom\r\n\r\n          // 创建主绘图区域组\r\n          const g = document.createElementNS(\"http://www.w3.org/2000/svg\", \"g\")\r\n          g.setAttribute(\"transform\", `translate(${margin.left},${margin.top})`)\r\n          svg.appendChild(g)\r\n\r\n          // 汇总所有折线的数据，计算全局范围\r\n          const allData = lines.flatMap(l => l.data)\r\n          const xValues = allData.map(d => d.x)\r\n          const yValues = allData.map(d => d.y)\r\n          const xMin = Math.min(...xValues)\r\n          const xMax = Math.max(...xValues)\r\n          const yMin = Math.min(...yValues)\r\n          const yMax = Math.max(...yValues)\r\n\r\n          // 添加一些边距，避免数据点落在轴上\r\n          const xPadding = (xMax - xMin) * 0.1 || 1\r\n          const yPadding = (yMax - yMin) * 0.1 || 1\r\n          const xScaleMin = xMin - xPadding\r\n          const xScaleMax = xMax + xPadding\r\n          const yScaleMin = yMin - yPadding\r\n          const yScaleMax = yMax + yPadding\r\n\r\n          // 缩放函数\r\n          const xScale = value => {\r\n            return ((value - xScaleMin) / (xScaleMax - xScaleMin)) * innerWidth\r\n          }\r\n          const yScale = value => {\r\n            return innerHeight - ((value - yScaleMin) / (yScaleMax - yScaleMin)) * innerHeight\r\n          }\r\n\r\n          // 绘制X轴\r\n          const xAxis = document.createElementNS(\"http://www.w3.org/2000/svg\", \"line\")\r\n          xAxis.setAttribute(\"x1\", 0)\r\n          xAxis.setAttribute(\"y1\", innerHeight)\r\n          xAxis.setAttribute(\"x2\", innerWidth)\r\n          xAxis.setAttribute(\"y2\", innerHeight)\r\n          xAxis.setAttribute(\"stroke\", \"white\")\r\n          xAxis.setAttribute(\"stroke-width\", 1)\r\n          g.appendChild(xAxis)\r\n\r\n          // 绘制Y轴\r\n          const yAxis = document.createElementNS(\"http://www.w3.org/2000/svg\", \"line\")\r\n          yAxis.setAttribute(\"x1\", 0)\r\n          yAxis.setAttribute(\"y1\", 0)\r\n          yAxis.setAttribute(\"x2\", 0)\r\n          yAxis.setAttribute(\"y2\", innerHeight)\r\n          yAxis.setAttribute(\"stroke\", \"white\")\r\n          yAxis.setAttribute(\"stroke-width\", 1)\r\n          g.appendChild(yAxis)\r\n\r\n          // 绘制X轴刻度\r\n          const xTicks = 5\r\n          for (let i = 0; i <= xTicks; i++) {\r\n            const value = xScaleMin + (i / xTicks) * (xScaleMax - xScaleMin)\r\n            const x = xScale(value)\r\n            const tick = document.createElementNS(\"http://www.w3.org/2000/svg\", \"line\")\r\n            tick.setAttribute(\"x1\", x)\r\n            tick.setAttribute(\"y1\", innerHeight)\r\n            tick.setAttribute(\"x2\", x)\r\n            tick.setAttribute(\"y2\", innerHeight + 6)\r\n            tick.setAttribute(\"stroke\", \"white\")\r\n            g.appendChild(tick)\r\n          }\r\n\r\n          // 绘制Y轴刻度\r\n          const yTicks = 5\r\n          for (let i = 0; i <= yTicks; i++) {\r\n            const value = yScaleMin + (i / yTicks) * (yScaleMax - yScaleMin)\r\n            const y = yScale(value)\r\n            const tick = document.createElementNS(\"http://www.w3.org/2000/svg\", \"line\")\r\n            tick.setAttribute(\"x1\", -6)\r\n            tick.setAttribute(\"y1\", y)\r\n            tick.setAttribute(\"x2\", 0)\r\n            tick.setAttribute(\"y2\", y)\r\n            tick.setAttribute(\"stroke\", \"white\")\r\n            g.appendChild(tick)\r\n          }\r\n\r\n          // 遍历每条折线\r\n          lines.forEach(line => {\r\n            const data = line.data\r\n            const color = line.color || \"#64B5F6\"\r\n            const dashColor = lightenColor(color, 0.4)\r\n\r\n            // 绘制折线路径\r\n            if (data.length > 1) {\r\n              let pathData = \"\"\r\n              data.forEach((d, i) => {\r\n                const x = xScale(d.x)\r\n                const y = yScale(d.y)\r\n                if (i === 0) {\r\n                  pathData += `M ${x} ${y}`\r\n                } else {\r\n                  pathData += ` L ${x} ${y}`\r\n                }\r\n              })\r\n              const path = document.createElementNS(\"http://www.w3.org/2000/svg\", \"path\")\r\n              path.setAttribute(\"d\", pathData)\r\n              path.setAttribute(\"fill\", \"none\")\r\n              path.setAttribute(\"stroke\", color)\r\n              path.setAttribute(\"stroke-width\", 2)\r\n              g.appendChild(path)\r\n            }\r\n\r\n            // 绘制数据点、虚线和标签\r\n            data.forEach(d => {\r\n              const x = xScale(d.x)\r\n              const y = yScale(d.y)\r\n\r\n              // 绘制数据点\r\n              const circle = document.createElementNS(\"http://www.w3.org/2000/svg\", \"circle\")\r\n              circle.setAttribute(\"cx\", x)\r\n              circle.setAttribute(\"cy\", y)\r\n              circle.setAttribute(\"r\", 4)\r\n              circle.setAttribute(\"fill\", color)\r\n              g.appendChild(circle)\r\n\r\n              // 如果visX为true，绘制向X轴的虚线并标注xLabel\r\n              if (d.visX) {\r\n                const dashLine = document.createElementNS(\"http://www.w3.org/2000/svg\", \"line\")\r\n                dashLine.setAttribute(\"x1\", x)\r\n                dashLine.setAttribute(\"y1\", y)\r\n                dashLine.setAttribute(\"x2\", x)\r\n                dashLine.setAttribute(\"y2\", innerHeight)\r\n                dashLine.setAttribute(\"stroke\", dashColor)\r\n                dashLine.setAttribute(\"stroke-width\", 1)\r\n                dashLine.setAttribute(\"stroke-dasharray\", \"4,2\")\r\n                g.appendChild(dashLine)\r\n\r\n                const label = document.createElementNS(\"http://www.w3.org/2000/svg\", \"text\")\r\n                label.setAttribute(\"x\", x)\r\n                label.setAttribute(\"y\", innerHeight + 15)\r\n                label.setAttribute(\"text-anchor\", \"middle\")\r\n                label.setAttribute(\"font-size\", \"11px\")\r\n                label.setAttribute(\"fill\", color)\r\n                label.textContent = d.xLable || d.xLabel || \"\"\r\n                g.appendChild(label)\r\n              }\r\n\r\n              // 如果visY为true，绘制向Y轴的虚线并标注yLabel\r\n              if (d.visY) {\r\n                const dashLine = document.createElementNS(\"http://www.w3.org/2000/svg\", \"line\")\r\n                dashLine.setAttribute(\"x1\", x)\r\n                dashLine.setAttribute(\"y1\", y)\r\n                dashLine.setAttribute(\"x2\", 0)\r\n                dashLine.setAttribute(\"y2\", y)\r\n                dashLine.setAttribute(\"stroke\", dashColor)\r\n                dashLine.setAttribute(\"stroke-width\", 1)\r\n                dashLine.setAttribute(\"stroke-dasharray\", \"4,2\")\r\n                g.appendChild(dashLine)\r\n\r\n                const label = document.createElementNS(\"http://www.w3.org/2000/svg\", \"text\")\r\n                label.setAttribute(\"x\", -10)\r\n                label.setAttribute(\"y\", y)\r\n                label.setAttribute(\"text-anchor\", \"end\")\r\n                label.setAttribute(\"dominant-baseline\", \"middle\")\r\n                label.setAttribute(\"font-size\", \"11px\")\r\n                label.setAttribute(\"fill\", color)\r\n                label.textContent = d.yLable || d.yLabel || \"\"\r\n                g.appendChild(label)\r\n              }\r\n            })\r\n          })\r\n        }\r\n        window.addEventListener(\"DOMContentLoaded\", () => {\r\n            adjustFontSize();\r\n            // 本地字体也会异步加载；等待实际字体再执行同一套宽高约束。\r\n            if (document.fonts) document.fonts.ready.then(adjustFontSize);\r\n        });\r\n        window.addEventListener(\"resize\", adjustFontSize);\r\n    </script>\r\n    "
$$line=[867,4]
}
$$out+="\r\n</body>\r\n\r\n</html>\r\n"
}catch(error){
throw {name:'RuntimeError',path:null,message:error.message,line:$$line[0]+1,column:$$line[1]+1,source:"<!DOCTYPE html>\r\n<html lang=\"zh-cn\">\r\n\r\n<head>\r\n    <meta charset=\"utf-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width\">\r\n    <link rel=\"shortcut icon\" href=\"#\" />\r\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"{{_res_path}}html/common/common.css\" />\r\n    \r\n    {{if theme == \"snow\"}}\r\n    <link rel=\"stylesheet\" href=\"{{_res_path}}html/common/theme/snow/snow.css\">\r\n    {{else if theme == \"topText\" || theme == \"foolsDay\"}}\r\n    <link rel=\"stylesheet\" href=\"{{_res_path}}html/common/theme/topText/topText.css\">\r\n    {{/if}}\r\n\r\n    \r\n{{if themeInfo && themeInfo.cssUrl && themeInfo.cssMode == \"replace\"}}\r\n<link rel=\"stylesheet\" href=\"{{themeInfo.cssUrl}}\">\r\n{{else}}\r\n<link rel=\"stylesheet\" href=\"{{_res_path}}html/b19/b19.css\">\r\n{{if renderNoJs}}\r\n<style>\r\n    /* 中文 Chromium 的小号字体关键字最低为 12px，静态引擎需要显式值。 */\r\n    .num p, .Nosignal .client p { font-size: 12px; }\r\n</style>\r\n{{/if}}\r\n{{/if}}\r\n\r\n\r\n    {{if themeInfo && themeInfo.cssUrl && themeInfo.cssMode == \"overlay\"}}\r\n    <link rel=\"stylesheet\" href=\"{{themeInfo.cssUrl}}\">\r\n    {{/if}}\r\n\r\n    {{if themeInfo}}\r\n    <!-- 清单中的颜色和字体置于页面/主题 CSS 之后，保证清单配置优先。 -->\r\n    <style>\r\n        {{if themeInfo.fontUrl}}\r\n        @font-face { font-family: \"phi-theme\"; src: url(\"{{@ themeInfo.fontUrl}}\") format(\"truetype\"); }\r\n        {{/if}}\r\n        {{if themeInfo.colors}}\r\n        :root {\r\n            {{if themeInfo.colors.AT}}--AT: {{themeInfo.colors.AT}}; --phi-theme-AT: {{themeInfo.colors.AT}}; --phi-theme-AT-dark: color-mix(in srgb, {{themeInfo.colors.AT}} 50%, black);{{/if}}\r\n            {{if themeInfo.colors.IN}}--IN: {{themeInfo.colors.IN}}; --phi-theme-IN: {{themeInfo.colors.IN}}; --phi-theme-IN-dark: color-mix(in srgb, {{themeInfo.colors.IN}} 50%, black);{{/if}}\r\n            {{if themeInfo.colors.HD}}--HD: {{themeInfo.colors.HD}}; --phi-theme-HD: {{themeInfo.colors.HD}}; --phi-theme-HD-dark: color-mix(in srgb, {{themeInfo.colors.HD}} 50%, black);{{/if}}\r\n            {{if themeInfo.colors.EZ}}--EZ: {{themeInfo.colors.EZ}}; --phi-theme-EZ: {{themeInfo.colors.EZ}}; --phi-theme-EZ-dark: color-mix(in srgb, {{themeInfo.colors.EZ}} 50%, black);{{/if}}\r\n        }\r\n        {{/if}}\r\n        {{if themeInfo.fontUrl}}\r\n        body { font-family: \"phi-theme\", \"PHI\", \"NOTO\", \"NotoSansJP\", \"HIMALAYA\", \"NotoSansMath-Regular\"; }\r\n        {{/if}}\r\n        {{if themeInfo.backgroundUrl}}\r\n        body > .background:not(.theme-background) { display: none; }\r\n        {{/if}}\r\n    </style>\r\n    {{/if}}\r\n    {{if renderNoJs}}\r\n    <style>\r\n        /* 页面保留自己的换行规则；只有显式声明的固定标题栏允许单行省略。 */\r\n        body [name=\"pvis\"] { min-width: 0; max-width: 100%; }\r\n        body .phi-fit-line[name=\"pvis\"] { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\r\n        .phi-static-theme { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: -1; }\r\n        .phi-static-stars {\r\n            background-image: radial-gradient(circle, #fff9 1px, transparent 2px), radial-gradient(circle, #9dd7ff88 1px, transparent 2px), radial-gradient(circle, #fff6 1.5px, transparent 3px);\r\n            background-size: 131px 173px, 227px 193px, 367px 293px;\r\n            background-position: 31px 47px, 97px 131px, 173px 53px;\r\n        }\r\n        .phi-static-theme .snow { width: 2.5%; }\r\n        .phi-static-theme .snow img { width: 100%; }\r\n        .phi-static-theme.topTextBox p { font-size: 18px; opacity: .35; filter: blur(1px); }\r\n        body > canvas#stars, body > .snow-box, body > .topTextBox:not(.phi-static-theme) { display: none; }\r\n    </style>\r\n    {{/if}}\r\n    <title>phi-plugin</title>\r\n</head>\r\n\r\n<body class=\"elem-{{element || elem || `hydro`}} {{displayMode || mode || `default`}}-mode  {{bodyClass}}\" {{@sys.scale}}>\r\n\r\n\r\n    <div class=\"background theme-background\">\r\n        {{if themeInfo && themeInfo.backgroundUrl}}\r\n        <img src=\"{{themeInfo.backgroundUrl}}\" alt=\"主题背景\"\r\n            style=\"object-fit: cover; min-width: 100%;\">\r\n        {{else if theme == \"star\"}}\r\n        <img src=\"{{_res_path}}html/otherimg/Star1.png\" alt=\"曲绘-模糊\">\r\n        <img src=\"{{_res_path}}html/otherimg/Star2.png\" alt=\"曲绘-模糊\"\r\n            style=\"min-height: 0;width: 100%;height: auto;bottom: 0;filter: none;\">\r\n        {{else}}\r\n        {{if background}}\r\n        <img src=\"{{background}}\" alt=\"曲绘-模糊\">\r\n        {{else}}\r\n        <img src=\"{{_res_path}}html/otherimg/phigros.png\" alt=\"曲绘-模糊\">\r\n        {{/if}}\r\n        {{/if}}\r\n    </div>\r\n\r\n    {{if !renderNoJs}}\r\n    <script>\r\n        var _res_path = \"{{_res_path}}\";\r\n    </script>\r\n\r\n    {{if theme == \"snow\"}}\r\n    <script src=\"{{_res_path}}html/common/theme/snow/snow.js\"></script>\r\n    {{else if theme == \"topText\" || theme == \"foolsDay\"}}\r\n    <script src=\"{{_res_path}}html/common/theme/topText/topText.js\"></script>\r\n    {{else if theme == \"star\"}}\r\n    <script src=\"{{_res_path}}html/common/theme/star/star.js\"></script>\r\n    {{/if}}\r\n    {{/if}}\r\n\r\n    <!-- <div class=\"container\" id=\"container\"> -->\r\n    \r\n\r\n<div class=\"title\">\r\n    <div class=\"playerInfo\">\r\n        <div class=\"blackBlock clip-box\"></div>\r\n        <div class=\"avatar clip-box\">\r\n            <img src=\"{{_res_path}}html/avatar/{{gameuser.avatar}}.png\" alt=\"{{gameuser.avatar}}\">\r\n        </div>\r\n        <div class=\"playerId\">\r\n            <p name=\"pvis\"{{if renderNoJs}} class=\"phi-fit-line\" title=\"{{gameuser.PlayerId}}\"{{/if}}>{{#gameuser.PlayerId}}</p>\r\n        </div>\r\n        <div class=\"rks clip-box\">\r\n            <p>{{gameuser.rks.toFixed(4)}}</p>\r\n        </div>\r\n        <div class=\"clgBox\">\r\n            <div class=\"Challenge\">\r\n            <img src=\"{{_res_path}}html/otherimg/{{gameuser.ChallengeMode}}.png\" alt=\"Challenge\">\r\n            <p>{{gameuser.ChallengeModeRank}}</p>\r\n            </div>\r\n        </div>\r\n        <div class=\"date\">\r\n            <p>{{Date}}</p>\r\n        </div>\r\n        <div class=\"dataBox clip-box\">\r\n            <img src=\"{{_res_path}}html/otherimg/data.png\" alt=\"data\">\r\n            <p>{{gameuser.data}}</p>\r\n        </div>\r\n        {{if spInfo}}\r\n        <div class=\"spInfoBox\">\r\n            {{each spInfo v}}\r\n            <div class=\"spInfo colorful-background clip-box\">\r\n                <p>{{v}}</p>\r\n            </div>\r\n            {{/each}}\r\n        </div>\r\n        {{/if}}\r\n    </div>\r\n    <div class=\"recordInfo clip-box\">\r\n        <div class=\"whiteLine clip-box\"></div>\r\n        <div class=\"sheet\">\r\n            <div class=\"row\">\r\n                <div class=\"poz\">\r\n                    <p>\\</p>\r\n                </div>\r\n                {{each stats v i}}\r\n                <div class=\"poz\">\r\n                    <p>{{v.title}}</p>\r\n                </div>\r\n                {{/each}}\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"poz\">\r\n                    <p>C</p>\r\n                </div>\r\n                {{each stats v i}}\r\n                <div class=\"poz\">\r\n                    <p>{{v.cleared}}</p>\r\n                </div>\r\n                {{/each}}\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"poz\">\r\n                    <p>FC</p>\r\n                </div>\r\n                {{each stats v i}}\r\n                <div class=\"poz\">\r\n                    <p>{{v.fc}}</p>\r\n                </div>\r\n                {{/each}}\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"poz\">\r\n                    <p>Phi</p>\r\n                </div>\r\n                {{each stats v i}}\r\n                <div class=\"poz\">\r\n                    <p>{{v.phi}}</p>\r\n                </div>\r\n                {{/each}}\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"b19\">\r\n    {{if phi}}\r\n\r\n    {{each phi song}}\r\n\r\n    {{if song}}\r\n\r\n\r\n    <div class=\"song phi_song\">\r\n        <div class=\"ill-box\">\r\n            <div class=\"num clip-box\">\r\n                <p name=\"pvis\">P{{$index+1}}</p>\r\n            </div>\r\n            <div class=\"ill clip-box\">\r\n                <img src=\"{{song.illustration}}\" alt=\"ill\">\r\n            </div>\r\n            <div class=\"rank-{{song.rank}} clip-box\">\r\n                <div class=\"org\">\r\n                    <p>{{song.rank}}&ensp;{{song.difficulty.toFixed(1)}}</p>\r\n                </div>\r\n                <div class=\"rel\">\r\n                    <p>{{song.rks.toFixed(2)}}</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"info-{{song.rank}}\">\r\n            <div class=\"songname\">\r\n                <p name=\"pvis\"{{if renderNoJs}} class=\"phi-fit-line\" title=\"{{song.song}}\"{{/if}}>{{song.song}}</p>\r\n            </div>\r\n            <div class=\"songinfo\">\r\n                <div class=\"Rating\">\r\n                    <img src=\"{{themeInfo && themeInfo.icons && themeInfo.icons[song.Rating] ? themeInfo.icons[song.Rating] : (_res_path + 'html/otherimg/' + song.Rating + '.png')}}\" alt=\"{{song.Rating}}\">\r\n                </div>\r\n                <div class=\"chengji\">\r\n                    <div class=\"score\">\r\n                        <p>{{song.score}}</p>\r\n                    </div>\r\n                    <div class=\"line\"></div>\r\n                    <div class=\"acc-box\">\r\n                        <div class=\"acc\">\r\n                            <p>{{song.acc.toFixed(2)}}%</p>\r\n                        </div>\r\n                        <div class=\"suggest suggest-kind-{{song.suggestType}}\">\r\n                            <div class=\"suggest-tip\"></div>\r\n                            <p>{{song.suggest}}</p>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        {{if song.accAvg}}\r\n        <div class=\"accAvg acc{{song.accKind}} clip-box\">\r\n            <div class=\"accAvgLine clip-box\"></div>\r\n            <svg viewBox=\"0 0 1024 1024\">\r\n            {{if song.accKind == 'Finished'}}\r\n            <path\r\n            d=\"M892.064 261.888a31.936 31.936 0 0 0-45.216 1.472L421.664 717.248l-220.448-185.216a32 32 0 1 0-41.152 48.992l243.648 204.704a31.872 31.872 0 0 0 20.576 7.488 31.808 31.808 0 0 0 23.36-10.112L893.536 307.136a32 32 0 0 0-1.472-45.248z\"\r\n            p-id=\"5526\"\r\n            ></path>\r\n            {{else}}\r\n            <path\r\n                d=\"M564.8 465.184l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z m0-256l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z\"\r\n                fill=\"#333333\"\r\n                p-id=\"1589\"\r\n            ></path>\r\n            {{/if}}\r\n            </svg>\r\n            <p>Avg: {{song.accAvg.toFixed(4)}}%</p>\r\n        </div>\r\n        {{/if}}\r\n        {{if song.cpToOld}}\r\n        <div class=\"cpToOld acc{{song.cpToOld.type}} clip-box-left\">\r\n            <p>Dif</p>\r\n            <svg viewBox=\"0 0 1024 1024\">\r\n            <path\r\n                d=\"M564.8 465.184l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z m0-256l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z\"\r\n                fill=\"#333333\"\r\n                p-id=\"1589\"\r\n            ></path>\r\n            </svg>\r\n            <p>{{song.cpToOld.dif}}&ensp;&ensp;&ensp;RKS</p>\r\n            <svg viewBox=\"0 0 1024 1024\">\r\n            <path\r\n                d=\"M564.8 465.184l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z m0-256l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z\"\r\n                fill=\"#333333\"\r\n                p-id=\"1589\"\r\n            ></path>\r\n            </svg>\r\n            <p>{{song.cpToOld.rks}}</p>\r\n        </div>\r\n        {{/if}}\r\n    </div>\r\n\r\n    {{else}}\r\n\r\n    <div class=\"Nosignal\">\r\n        <div class=\"border_corner border_corner_left_top\"></div>\r\n        <div class=\"border_corner border_corner_right_top\"></div>\r\n        <div class=\"border_corner border_corner_left_bottom\"></div>\r\n        <div class=\"border_corner border_corner_right_bottom\"></div>\r\n        <div class=\"line\"></div>\r\n        <div class=\"timeout\">\r\n            <p>TIME_OUT</p>\r\n        </div>\r\n        <div class=\"client\">\r\n            <p>>>> PhigrOS Client Finding Phi.score</p>\r\n        </div>\r\n        <div class=\"sqrt\"></div>\r\n    </div>\r\n\r\n    {{/if}}\r\n\r\n    {{/each}}\r\n\r\n    {{/if}}\r\n\r\n\r\n    {{each b19_list song}}\r\n    \r\n    {{if $index == (phi ? 27 : 30)}}\r\n    <div class=\"over_flow\">\r\n        <div class=\"flow_line_box_l\">\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n        </div>\r\n        <p><i>OVER FLOW</i></p>\r\n        <div class=\"flow_line_box_r\">\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n            <div class=\"flow_line\"></div>\r\n        </div>\r\n    </div>\r\n    {{/if}}\r\n\r\n\r\n    <div class=\"song {{$index < (phi ? 27 : 30) ? 'b_song':''}}\">\r\n        <div class=\"ill-box\">\r\n            <div class=\"num clip-box\">\r\n                <p name=\"pvis\">#{{song.num}}</p>\r\n            </div>\r\n            <div class=\"ill clip-box\">\r\n                <img src=\"{{song.illustration}}\" alt=\"ill\">\r\n            </div>\r\n            <div class=\"rank-{{song.rank}} clip-box\">\r\n                <div class=\"org\">\r\n                    <p>{{song.rank}}&ensp;{{song.difficulty.toFixed(1)}}</p>\r\n                </div>\r\n                <div class=\"rel\">\r\n                    <p>{{song.rks.toFixed(2)}}</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"info-{{song.rank}}\">\r\n            <div class=\"songname\">\r\n                <p name=\"pvis\"{{if renderNoJs}} class=\"phi-fit-line\" title=\"{{song.song}}\"{{/if}}>{{song.song}}</p>\r\n            </div>\r\n            <div class=\"songinfo\">\r\n                <div class=\"Rating\">\r\n                    <img src=\"{{themeInfo && themeInfo.icons && themeInfo.icons[song.Rating] ? themeInfo.icons[song.Rating] : (_res_path + 'html/otherimg/' + song.Rating + '.png')}}\" alt=\"{{song.Rating}}\">\r\n                </div>\r\n                <div class=\"chengji\">\r\n                    <div class=\"score\">\r\n                        <p>{{song.score}}</p>\r\n                    </div>\r\n                    <div class=\"line\"></div>\r\n                    <div class=\"acc-box\">\r\n                        <div class=\"acc\">\r\n                            <p>{{song.acc.toFixed(2)}}%</p>\r\n                        </div>\r\n                        <div class=\"suggest suggest-kind-{{song.suggestType}}\">\r\n                            <div class=\"suggest-tip\"></div>\r\n                            <p>{{song.suggest}}</p>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n            \r\n        {{if song.accAvg}}\r\n        <div class=\"accAvg acc{{song.accKind}} clip-box\">\r\n            <div class=\"accAvgLine clip-box\"></div>\r\n            <svg viewBox=\"0 0 1024 1024\">\r\n            {{if song.accKind == 'Finished'}}\r\n            <path\r\n            d=\"M892.064 261.888a31.936 31.936 0 0 0-45.216 1.472L421.664 717.248l-220.448-185.216a32 32 0 1 0-41.152 48.992l243.648 204.704a31.872 31.872 0 0 0 20.576 7.488 31.808 31.808 0 0 0 23.36-10.112L893.536 307.136a32 32 0 0 0-1.472-45.248z\"\r\n            p-id=\"5526\"\r\n            ></path>\r\n            {{else}}\r\n            <path\r\n                d=\"M564.8 465.184l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z m0-256l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z\"\r\n                fill=\"#333333\"\r\n                p-id=\"1589\"\r\n            ></path>\r\n            {{/if}}\r\n            </svg>\r\n            <p>{{song.accAvg}}</p>\r\n        </div>\r\n        {{/if}}\r\n        {{if song.cpToOld}}\r\n        <div class=\"cpToOld acc{{song.cpToOld.type}} clip-box-left\">\r\n            <p>Dif</p>\r\n            <svg viewBox=\"0 0 1024 1024\">\r\n            <path\r\n                d=\"M564.8 465.184l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z m0-256l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z\"\r\n                fill=\"#333333\"\r\n                p-id=\"1589\"\r\n            ></path>\r\n            </svg>\r\n            <p>{{song.cpToOld.dif}}&ensp;&ensp;&ensp;RKS</p>\r\n            <svg viewBox=\"0 0 1024 1024\">\r\n            <path\r\n                d=\"M564.8 465.184l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z m0-256l4.192 3.904 274.72 274.752a32 32 0 0 1 0 45.248l-22.624 22.624a32 32 0 0 1-45.248 0l-263.456-263.392-263.424 263.392a32 32 0 0 1-42.24 2.656l-3.008-2.656-22.624-22.624a32 32 0 0 1 0-45.248l274.784-274.752a80 80 0 0 1 108.96-3.904z\"\r\n                fill=\"#333333\"\r\n                p-id=\"1589\"\r\n            ></path>\r\n            </svg>\r\n            <p>{{song.cpToOld.rks}}</p>\r\n        </div>\r\n        {{/if}}\r\n    </div>\r\n\r\n    {{/each}}\r\n\r\n</div>\r\n{{if b30Analysis}}\r\n<div class=\"over_flow\">\r\n    <div class=\"flow_line_box_l\">\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n    </div>\r\n    <p><i>B30 数据分析</i></p>\r\n    <div class=\"flow_line_box_r\">\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n        <div class=\"flow_line\"></div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"b30-analysis-row {{if b30Analysis.histogramWide}}histogram-wide{{/if}}\">\r\n    {{if b30Analysis.showTags}}\r\n    <section class=\"analysis-panel tag-analysis-panel clip-box\">\r\n        <div class=\"analysis-panel-head\">\r\n            <div>\r\n                <p class=\"analysis-kicker\">CHART PROFILE</p>\r\n                <p class=\"analysis-title\">谱面实力分析</p>\r\n            </div>\r\n            <p class=\"analysis-meta\">{{if b30Analysis.tagAnalysis && b30Analysis.tagAnalysis.threshold != null}}RKS≥{{b30Analysis.tagAnalysis.threshold.toFixed(1)}} · 成绩 {{b30Analysis.tagAnalysis.recordCount}} · 选票 {{b30Analysis.tagAnalysis.totalVotes}}{{else if b30Analysis.tagAnalysis}}有效票 {{b30Analysis.tagAnalysis.totalVotes}}{{else}}暂无数据{{/if}}</p>\r\n        </div>\r\n        <div class=\"tag-analysis-body {{if !b30Analysis.tagAnalysis || b30Analysis.tagAnalysis.insufficient}}is-insufficient{{/if}}\">\r\n            <div class=\"tag-analysis-content\">\r\n                <div class=\"tag-radar-column\">\r\n                    <div class=\"tag-radar-title\"><span></span><p>分类汇总</p></div>\r\n                    {{if b30Analysis.tagAnalysis && b30Analysis.tagAnalysis.radar.categories.length}}\r\n                    <svg class=\"tag-radar\" viewBox=\"0 0 200 184\" aria-label=\"分类标签能力雷达图\">\r\n                        {{each b30Analysis.tagAnalysis.radar.grids grid}}\r\n                        <polygon class=\"tag-radar-grid\" points=\"{{grid}}\"></polygon>\r\n                        {{/each}}\r\n                        {{each b30Analysis.tagAnalysis.radar.axes axis}}\r\n                        <line class=\"tag-radar-axis\" x1=\"100\" y1=\"92\" x2=\"{{axis.x}}\" y2=\"{{axis.y}}\"></line>\r\n                        {{/each}}\r\n                        <polygon class=\"tag-radar-shape\" points=\"{{b30Analysis.tagAnalysis.radar.points}}\"></polygon>\r\n                        {{each b30Analysis.tagAnalysis.radar.categories category}}\r\n                        <circle class=\"tag-radar-point\" cx=\"{{category.pointX}}\" cy=\"{{category.pointY}}\" r=\"2.3\"></circle>\r\n                        <text class=\"tag-radar-label\" x=\"{{category.labelX}}\" y=\"{{category.labelY}}\" text-anchor=\"{{category.anchor}}\">\r\n                            <tspan x=\"{{category.labelX}}\">{{category.name}}</tspan>\r\n                            <tspan class=\"tag-radar-score\" x=\"{{category.labelX}}\" dy=\"10\">{{category.displayRks}}</tspan>\r\n                        </text>\r\n                        {{/each}}\r\n                    </svg>\r\n                    {{/if}}\r\n                </div>\r\n                <div class=\"tag-ranking-column\">\r\n                    <div class=\"tag-ranking-group strong-tags\">\r\n                        <div class=\"tag-column-title\"><span></span><p>擅长词条</p></div>\r\n                        {{if b30Analysis.tagAnalysis}}\r\n                        {{each b30Analysis.tagAnalysis.strong tag}}\r\n                        <div class=\"tag-result-row\">\r\n                            <p class=\"tag-rank\">{{$index + 1}}</p>\r\n                            <p class=\"tag-name\">{{tag.name}}</p>\r\n                            <p class=\"tag-rks\">{{tag.rks.toFixed(2)}}</p>\r\n                        </div>\r\n                        {{/each}}\r\n                        {{/if}}\r\n                    </div>\r\n                    <div class=\"tag-ranking-group weak-tags\">\r\n                        <div class=\"tag-column-title\"><span></span><p>薄弱词条</p></div>\r\n                        {{if b30Analysis.tagAnalysis}}\r\n                        {{each b30Analysis.tagAnalysis.weak tag}}\r\n                        <div class=\"tag-result-row\">\r\n                            <p class=\"tag-rank\">{{$index + 1}}</p>\r\n                            <p class=\"tag-name\">{{tag.name}}</p>\r\n                            <p class=\"tag-rks\">{{tag.rks.toFixed(2)}}</p>\r\n                        </div>\r\n                        {{/each}}\r\n                        {{/if}}\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            {{if !b30Analysis.tagAnalysis || b30Analysis.tagAnalysis.insufficient}}\r\n            <div class=\"tag-insufficient-message\">\r\n                <p>维度标签体系参考自 @空游小站（kyou.net.cn）</p>\r\n                <p>有效选票或逐标签成绩样本不足，请前往 phib19.top 或使用 /settag 进行谱面标签投票</p>\r\n            </div>\r\n            {{/if}}\r\n        </div>\r\n        {{if b30Analysis.tagAnalysis && !b30Analysis.tagAnalysis.insufficient}}\r\n        <div class=\"tag-analysis-tip\">\r\n            <p>维度标签体系参考自 @空游小站（kyou.net.cn）</p>\r\n            <p>谱面投票可前往 phib19.top 或使用 /settag 指令提交</p>\r\n        </div>\r\n        {{/if}}\r\n    </section>\r\n    {{/if}}\r\n\r\n    <section class=\"analysis-panel histogram-panel clip-box\">\r\n        <div class=\"analysis-panel-head\">\r\n            <div>\r\n                <p class=\"analysis-kicker\">RKS DISTRIBUTION</p>\r\n                <p class=\"analysis-title\">等效 RKS 直方图</p>\r\n            </div>\r\n            <div class=\"histogram-summary\">\r\n                <p>平均 RKS</p>\r\n                <p>{{b30Analysis.histogram.average.toFixed(4)}}</p>\r\n            </div>\r\n        </div>\r\n        <div class=\"histogram-chart\">\r\n            <div class=\"histogram-y-label\">等效单曲 RKS</div>\r\n            <div class=\"histogram-plot\">\r\n                <div class=\"histogram-scale\">\r\n                    {{each b30Analysis.histogram.ticks tick}}\r\n                    <div class=\"histogram-grid-line\" style=\"bottom: {{tick.position}}%;\"><p>{{tick.label}}</p></div>\r\n                    {{/each}}\r\n                    <div class=\"average-marker\" style=\"bottom: {{b30Analysis.histogram.averagePosition}}%;\"><p>AVG {{b30Analysis.histogram.average.toFixed(4)}}</p></div>\r\n                </div>\r\n                <div class=\"histogram-bars\">\r\n                    {{each b30Analysis.histogram.slots slot}}\r\n                    <div class=\"histogram-slot\">\r\n                        <div class=\"histogram-bar-area\">\r\n                            <div class=\"histogram-bar {{slot.kind == 'phi' ? 'phi-bar' : 'best-bar'}}\" style=\"height: {{slot.height}}%;\"></div>\r\n                        </div>\r\n                        <p class=\"histogram-slot-label\">{{slot.label}}</p>\r\n                    </div>\r\n                    {{/each}}\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"histogram-legend\">\r\n            <p><span class=\"legend-dot phi-dot\"></span>P1-P3</p>\r\n            <p><span class=\"legend-dot best-dot\"></span>B1-B27</p>\r\n            <p>{{b30Analysis.histogram.count}} 个有效槽位</p>\r\n        </div>\r\n    </section>\r\n</div>\r\n{{/if}}\r\n<div class=\"createdbox\">\r\n    <div class=\"phi-plugin\">\r\n        <p>{{_plugin}}</p>\r\n    </div>\r\n    <div class=\"ver\">\r\n        <p>{{Version.ver}}</p>\r\n    </div>\r\n</div>\r\n<div class=\"copyright\">\r\n    <p>*Phi-Plugin不是Phigros官方项目，与南京鸽游网络有限公司及Phigros官方不存在授权、合作或运营关系。\r\n    </p>\r\n</div>\r\n\r\n{{if theme == \"snow\"}}\r\n<div class=\"snow-box\"> </div>\r\n<script>\r\n    themeSnow();\r\n</script>\r\n{{else if theme == \"topText\" || theme == \"foolsDay\"}}\r\n<div class=\"topTextBox\" id=\"topTextBox\"></div>\r\n<script>\r\n    themeTopText();\r\n</script>\r\n{{else if theme == \"star\"}}\r\n<canvas id=\"stars\"></canvas>\r\n<script>\r\n    themeStar();\r\n</script>\r\n{{/if}}\r\n\r\n\n{{set pvis = ({\r\n    default: false,\r\n    '.playerId': [306, 64, 32, 18, null, { method: 'pvis', nowrap: true, useFontMetrics: !(themeInfo && themeInfo.fontUrl) }],\r\n    '.songname': [168, 23, 15, 11, null, { method: 'pvis', nowrap: true, useFontMetrics: !(themeInfo && themeInfo.fontUrl) }]\r\n})}}\r\n    {{if renderNoJs}}\r\n    {{if theme == \"star\"}}\r\n    <div class=\"phi-static-theme phi-static-stars\" aria-hidden=\"true\"></div>\r\n    {{else if theme == \"snow\"}}\r\n    <div class=\"phi-static-theme\" aria-hidden=\"true\">\r\n        {{set staticFlakes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}}\r\n        {{each staticFlakes index}}\r\n        <div class=\"snow\" style=\"left: {{(index * 37 + 11) % 100}}%; top: {{(index * 23 + 7) % 100}}%; transform: rotate({{index * 47}}deg); opacity: .6;\">\r\n            <img src=\"{{_res_path}}html/otherimg/snow{{index % 4 + 1}}.png\" alt=\"\">\r\n        </div>\r\n        {{/each}}\r\n    </div>\r\n    {{else if theme == \"topText\" || theme == \"foolsDay\"}}\r\n    <div class=\"phi-static-theme topTextBox\" aria-hidden=\"true\">\r\n        {{set staticThemeTexts = ['等待超时，请稍后重试QAQ!', '渲染失败QAQ!', '格式错误QAQ!', '未找到符合条件的谱面QAQ!', '更新失败QAQ!', '未找到存档QAQ!', '等待超时，请稍后重试QAQ!', '格式错误QAQ!']}}\r\n        {{each staticThemeTexts text index}}\r\n        <p style=\"left: {{(index * 37 + 5) % 90}}%; top: {{(index * 23 + 5) % 75}}%;\">{{text}}</p>\r\n        {{/each}}\r\n    </div>\r\n    {{/if}}\r\n    {{/if}}\r\n    <!-- <div class=\"copyright\">{{@sys.copyright}}</div> -->\r\n    <!-- </div> -->\r\n    <!-- 曲目名称自适应name-box的宽度 -->\r\n\r\n    {{if !renderNoJs}}\r\n    <script>\r\n        function isBiggerThanParent(songName, parentElement) {\r\n            console.log(songName, parentElement)\r\n            console.log(songName.scrollWidth, parentElement.offsetWidth, songName.scrollHeight, parentElement.offsetHeight)\r\n            return songName.scrollWidth > parentElement.offsetWidth || songName.scrollHeight > parentElement.offsetHeight\r\n        }\r\n        const originalFontStyles = new WeakMap();\r\n        function adjustFontSize() {\r\n            //获取p元素\r\n            let a = document.getElementsByName('pvis')\r\n            for (let i = 0; i < a.length; ++i) {\r\n\r\n                let songName = a[i]\r\n\r\n                if (!songName) continue\r\n\r\n                // 每次按模板原字号重新测，避免先用回退字体缩小后无法恢复。\r\n                if (!originalFontStyles.has(songName)) originalFontStyles.set(songName, songName.style.fontSize);\r\n                else songName.style.fontSize = originalFontStyles.get(songName);\r\n\r\n                /*调整曲目名称字体大小*/\r\n                let parentElement = songName.parentElement\r\n\r\n                if (!isBiggerThanParent(songName, parentElement)) continue\r\n\r\n                let fontSize = Number(window.getComputedStyle(songName, null).getPropertyValue('font-size').replace(\"px\", \"\"));\r\n\r\n                let l = 0, r = fontSize;\r\n                while (l < r) {\r\n                    let mid = Math.floor((l + r + 1) / 2);\r\n                    songName.style.fontSize = mid + \"px\";\r\n                    if (isBiggerThanParent(songName, parentElement)) {\r\n                        r = mid - 1;\r\n                    } else {\r\n                        l = mid;\r\n                    }\r\n                }\r\n                songName.style.fontSize = l + \"px\";\r\n            }\r\n\r\n        }\r\n        \r\n        // 将颜色转为半透明（用于虚线）\r\n        function lightenColor(hex, alpha = 0.4) {\r\n          // 支持 #RRGGBB 格式\r\n          const r = parseInt(hex.slice(1, 3), 16)\r\n          const g = parseInt(hex.slice(3, 5), 16)\r\n          const b = parseInt(hex.slice(5, 7), 16)\r\n          return `rgba(${r},${g},${b},${alpha})`\r\n        }\r\n\r\n        // 绘制定数变化折线图的函数\r\n        // lines: { data: [{x, xLabel, visX, y, yLabel, visY}], color: string }[]\r\n        function drawDifficultyChart(svgId, lines) {\r\n          // 获取SVG元素\r\n          const svg = document.getElementById(svgId)\r\n          if (!svg) {\r\n            console.error(\"SVG元素未找到:\", svgId)\r\n            return\r\n          }\r\n\r\n          // 清空SVG内容\r\n          svg.innerHTML = \"\"\r\n\r\n          // 设置SVG尺寸\r\n          const width = parseInt(svg.getAttribute(\"width\")) || 800\r\n          const height = parseInt(svg.getAttribute(\"height\")) || 400\r\n\r\n          // 定义边距\r\n          const margin = { top: 30, right: 30, bottom: 50, left: 60 }\r\n          const innerWidth = width - margin.left - margin.right\r\n          const innerHeight = height - margin.top - margin.bottom\r\n\r\n          // 创建主绘图区域组\r\n          const g = document.createElementNS(\"http://www.w3.org/2000/svg\", \"g\")\r\n          g.setAttribute(\"transform\", `translate(${margin.left},${margin.top})`)\r\n          svg.appendChild(g)\r\n\r\n          // 汇总所有折线的数据，计算全局范围\r\n          const allData = lines.flatMap(l => l.data)\r\n          const xValues = allData.map(d => d.x)\r\n          const yValues = allData.map(d => d.y)\r\n          const xMin = Math.min(...xValues)\r\n          const xMax = Math.max(...xValues)\r\n          const yMin = Math.min(...yValues)\r\n          const yMax = Math.max(...yValues)\r\n\r\n          // 添加一些边距，避免数据点落在轴上\r\n          const xPadding = (xMax - xMin) * 0.1 || 1\r\n          const yPadding = (yMax - yMin) * 0.1 || 1\r\n          const xScaleMin = xMin - xPadding\r\n          const xScaleMax = xMax + xPadding\r\n          const yScaleMin = yMin - yPadding\r\n          const yScaleMax = yMax + yPadding\r\n\r\n          // 缩放函数\r\n          const xScale = value => {\r\n            return ((value - xScaleMin) / (xScaleMax - xScaleMin)) * innerWidth\r\n          }\r\n          const yScale = value => {\r\n            return innerHeight - ((value - yScaleMin) / (yScaleMax - yScaleMin)) * innerHeight\r\n          }\r\n\r\n          // 绘制X轴\r\n          const xAxis = document.createElementNS(\"http://www.w3.org/2000/svg\", \"line\")\r\n          xAxis.setAttribute(\"x1\", 0)\r\n          xAxis.setAttribute(\"y1\", innerHeight)\r\n          xAxis.setAttribute(\"x2\", innerWidth)\r\n          xAxis.setAttribute(\"y2\", innerHeight)\r\n          xAxis.setAttribute(\"stroke\", \"white\")\r\n          xAxis.setAttribute(\"stroke-width\", 1)\r\n          g.appendChild(xAxis)\r\n\r\n          // 绘制Y轴\r\n          const yAxis = document.createElementNS(\"http://www.w3.org/2000/svg\", \"line\")\r\n          yAxis.setAttribute(\"x1\", 0)\r\n          yAxis.setAttribute(\"y1\", 0)\r\n          yAxis.setAttribute(\"x2\", 0)\r\n          yAxis.setAttribute(\"y2\", innerHeight)\r\n          yAxis.setAttribute(\"stroke\", \"white\")\r\n          yAxis.setAttribute(\"stroke-width\", 1)\r\n          g.appendChild(yAxis)\r\n\r\n          // 绘制X轴刻度\r\n          const xTicks = 5\r\n          for (let i = 0; i <= xTicks; i++) {\r\n            const value = xScaleMin + (i / xTicks) * (xScaleMax - xScaleMin)\r\n            const x = xScale(value)\r\n            const tick = document.createElementNS(\"http://www.w3.org/2000/svg\", \"line\")\r\n            tick.setAttribute(\"x1\", x)\r\n            tick.setAttribute(\"y1\", innerHeight)\r\n            tick.setAttribute(\"x2\", x)\r\n            tick.setAttribute(\"y2\", innerHeight + 6)\r\n            tick.setAttribute(\"stroke\", \"white\")\r\n            g.appendChild(tick)\r\n          }\r\n\r\n          // 绘制Y轴刻度\r\n          const yTicks = 5\r\n          for (let i = 0; i <= yTicks; i++) {\r\n            const value = yScaleMin + (i / yTicks) * (yScaleMax - yScaleMin)\r\n            const y = yScale(value)\r\n            const tick = document.createElementNS(\"http://www.w3.org/2000/svg\", \"line\")\r\n            tick.setAttribute(\"x1\", -6)\r\n            tick.setAttribute(\"y1\", y)\r\n            tick.setAttribute(\"x2\", 0)\r\n            tick.setAttribute(\"y2\", y)\r\n            tick.setAttribute(\"stroke\", \"white\")\r\n            g.appendChild(tick)\r\n          }\r\n\r\n          // 遍历每条折线\r\n          lines.forEach(line => {\r\n            const data = line.data\r\n            const color = line.color || \"#64B5F6\"\r\n            const dashColor = lightenColor(color, 0.4)\r\n\r\n            // 绘制折线路径\r\n            if (data.length > 1) {\r\n              let pathData = \"\"\r\n              data.forEach((d, i) => {\r\n                const x = xScale(d.x)\r\n                const y = yScale(d.y)\r\n                if (i === 0) {\r\n                  pathData += `M ${x} ${y}`\r\n                } else {\r\n                  pathData += ` L ${x} ${y}`\r\n                }\r\n              })\r\n              const path = document.createElementNS(\"http://www.w3.org/2000/svg\", \"path\")\r\n              path.setAttribute(\"d\", pathData)\r\n              path.setAttribute(\"fill\", \"none\")\r\n              path.setAttribute(\"stroke\", color)\r\n              path.setAttribute(\"stroke-width\", 2)\r\n              g.appendChild(path)\r\n            }\r\n\r\n            // 绘制数据点、虚线和标签\r\n            data.forEach(d => {\r\n              const x = xScale(d.x)\r\n              const y = yScale(d.y)\r\n\r\n              // 绘制数据点\r\n              const circle = document.createElementNS(\"http://www.w3.org/2000/svg\", \"circle\")\r\n              circle.setAttribute(\"cx\", x)\r\n              circle.setAttribute(\"cy\", y)\r\n              circle.setAttribute(\"r\", 4)\r\n              circle.setAttribute(\"fill\", color)\r\n              g.appendChild(circle)\r\n\r\n              // 如果visX为true，绘制向X轴的虚线并标注xLabel\r\n              if (d.visX) {\r\n                const dashLine = document.createElementNS(\"http://www.w3.org/2000/svg\", \"line\")\r\n                dashLine.setAttribute(\"x1\", x)\r\n                dashLine.setAttribute(\"y1\", y)\r\n                dashLine.setAttribute(\"x2\", x)\r\n                dashLine.setAttribute(\"y2\", innerHeight)\r\n                dashLine.setAttribute(\"stroke\", dashColor)\r\n                dashLine.setAttribute(\"stroke-width\", 1)\r\n                dashLine.setAttribute(\"stroke-dasharray\", \"4,2\")\r\n                g.appendChild(dashLine)\r\n\r\n                const label = document.createElementNS(\"http://www.w3.org/2000/svg\", \"text\")\r\n                label.setAttribute(\"x\", x)\r\n                label.setAttribute(\"y\", innerHeight + 15)\r\n                label.setAttribute(\"text-anchor\", \"middle\")\r\n                label.setAttribute(\"font-size\", \"11px\")\r\n                label.setAttribute(\"fill\", color)\r\n                label.textContent = d.xLable || d.xLabel || \"\"\r\n                g.appendChild(label)\r\n              }\r\n\r\n              // 如果visY为true，绘制向Y轴的虚线并标注yLabel\r\n              if (d.visY) {\r\n                const dashLine = document.createElementNS(\"http://www.w3.org/2000/svg\", \"line\")\r\n                dashLine.setAttribute(\"x1\", x)\r\n                dashLine.setAttribute(\"y1\", y)\r\n                dashLine.setAttribute(\"x2\", 0)\r\n                dashLine.setAttribute(\"y2\", y)\r\n                dashLine.setAttribute(\"stroke\", dashColor)\r\n                dashLine.setAttribute(\"stroke-width\", 1)\r\n                dashLine.setAttribute(\"stroke-dasharray\", \"4,2\")\r\n                g.appendChild(dashLine)\r\n\r\n                const label = document.createElementNS(\"http://www.w3.org/2000/svg\", \"text\")\r\n                label.setAttribute(\"x\", -10)\r\n                label.setAttribute(\"y\", y)\r\n                label.setAttribute(\"text-anchor\", \"end\")\r\n                label.setAttribute(\"dominant-baseline\", \"middle\")\r\n                label.setAttribute(\"font-size\", \"11px\")\r\n                label.setAttribute(\"fill\", color)\r\n                label.textContent = d.yLable || d.yLabel || \"\"\r\n                g.appendChild(label)\r\n              }\r\n            })\r\n          })\r\n        }\r\n        window.addEventListener(\"DOMContentLoaded\", () => {\r\n            adjustFontSize();\r\n            // 本地字体也会异步加载；等待实际字体再执行同一套宽高约束。\r\n            if (document.fonts) document.fonts.ready.then(adjustFontSize);\r\n        });\r\n        window.addEventListener(\"resize\", adjustFontSize);\r\n    </script>\r\n    {{/if}}\r\n</body>\r\n\r\n</html>\r\n",stack:error.stack}
}
return $$out
});})();
