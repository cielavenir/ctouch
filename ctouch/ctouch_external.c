#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef unsigned int u32;

static const char *t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

#if 0
static int base64_encode(){ // 3 -> 4
	int i=0,j=0,b=0,c;
	u32 x=0;
	for(;~(c=fgetc(stdin));){
		x=(x<<8)+c;
		i++;
		b+=8;
		while(b>=6)b-=6,fputc(t[(x>>b)&0x3f],stdout),j++;
		if(j==76){fputc('\n',stdout);j=0;}
	}
	if(b)fputc(t[(x<<(6-b))&0x3f],stdout),j++;
	i%=3;
	if(i==2)fputs("=",stdout);
	if(i==1)fputs("==",stdout);
	if(j)fputc('\n',stdout);
	return 0;
}
#endif

static int base64_decode(FILE *in,FILE *out){
	int b=0,c;
	u32 x=0;
	char *p;
	for(;~(c=fgetc(in));){
		if(c=='='){
			break;
		}
		if(p=strchr(t,c)){
			x=(x<<6)+(p-t);
			b+=6;
			if(b>=8)b-=8,fputc((x>>b)&0xff,out);
		}
	}
	while(b>=8)b-=8,fputc((x>>b)&0xff,out);
	return 0;
}

#define FILENAME "ctouch_external.json"
int main(){
	int c;
	FILE *f;
	//chdir("."); //change this, if curdir isn't the same as CGI dir.
	puts("Content-Type: text/plain");
	puts("Cache-Control: no-store, no-cache, must-revalidate");
	puts("");
	char *request_method=getenv("REQUEST_METHOD");
	if(!strcasecmp(request_method,"POST")){
		f=fopen(FILENAME,"wb");
		base64_decode(stdin,f);
		fclose(f);
	}else{
		f=fopen(FILENAME,"rb");
		for(;~(c=fgetc(f));)putchar(c);
		fclose(f);
	}
	return 0;
}
