// ==UserScript==
// @name        CodeIQ sandbox
// @namespace   com.cielavenir
// @description CodeIQ sandbox
// @include     https://codeiq.jp/tools/sandbox/*
// @run-at      document-end
// @version     0.0.0.1
// ==/UserScript==

langs=[
	['7','ada','Ada'],
	['45','assembly_x86','Assembler (gcc)'],
	['13','assembly_x86','Assembler (nasm)'],
	['104','','AWK (gawk)'],
	['105','','AWK (mawk)'],
	['28','sh','Bash'],
	['110','','bc'],
	['12','','Brainf**k'],
	['11','c_cpp','C'],
	['27','csharp','C#'],
	['1','c_cpp','C++'],
	['44','c_cpp','C++14'],
	['34','c_cpp','C99 strict'],
	['14','','CLIPS'],
	['111','Clojure','Clojure'],
	['118','cobol','COBOL'],
	['106','cobol','COBOL 85'],
	['32','lisp','Common Lisp'],
	['102','d','D (dmd)'],
	['36','erlang','Erlang'],
	['124','','F#'],
	['123','','Factor'],
	['125','','Falcon'],
	['107','forth','Forth'],
	['5','','Fortran'],
	['114','golang','Go'],
	['121','groovy','Groovy'],
	['21','haskell','Haskell'],
	['16','','Icon'],
	['9','','Intercal'],
	['55','java','Java7'],
	['10','java','Java8'],
	['35','javascript','JavaScript (rhino)'],
	['112','javascript','JavaScript (spidermonkey)'],
	['26','lua','Lua'],
	['30','','Nemerle'],
	['25','','Nice'],
	['122','','Nim'],
	['56','javascript','Node.js'],
	['43','objectivec','Objective-C'],
	['8','ocaml','OCaml'],
	['127','','Octave'],
	['119','','Oz'],
	['22','pascal','Pascal (fpc)'],
	['2','pascal','Pascal (gpc)'],
	['3','perl','Perl'],
	['54','perl','Perl 6'],
	['29','php','PHP'],
	['19','','Pike'],
	['108','prolog','Prolog (gnu)'],
	['15','prolog','Prolog (swi)'],
	['4','python','Python'],
	['116','python','Python 3'],
	['117','r','R'],
	['17','ruby','Ruby'],
	['39','scala','Scala'],
	['33','scheme','Scheme'],
	['23','','Smalltalk'],
	['40','sql','Sql'],
	['38','tcl','Tcl'],
 	['62','','Text'],
	['115','','Unlambda'],
	['101','vbscript','VB.NET'],
	['6','','Whitespace'],
]

var lang=document.getElementById('lang');
var c=lang.children;
for(var i=c.length;--i>=0;)lang.removeChild(c[i]);
for(var i=0;i<langs.length;i++){
	var option=document.createElement('option');
	option.value=langs[i][0];
	option.setAttribute('syntax',langs[i][1]);
	option.setAttribute('label',langs[i][2]);
	lang.appendChild(option);
}
