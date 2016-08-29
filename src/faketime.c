/*
faketime: time hooker library
since we cannot issue newer Safari signature, we have to fake signature time... lol Apple...

Usage:
gcc -shared -fPIC -O2 -o src/faketime.so src/faketime.c
FAKETIME=2000-01-01_00:00:00 LD_PRELOAD=src/faketime.so DYLD_INSERT_LIBRARIES=src/faketime.so DYLD_FORCE_FLAT_NAMESPACE=YES PROG...
*/

#include <stdio.h>
#include <stdlib.h> //getenv
#include <string.h>
#include <time.h>
time_t g_t=0;
struct tm g_tm;

__attribute__((constructor)) void init(){
	memset(&g_tm,0,sizeof(struct tm));
	char *p = getenv("FAKETIME");
	if(p){
		sscanf(
			p,"%d-%d-%d_%d:%d:%d",
			&g_tm.tm_year,
			&g_tm.tm_mon,
			&g_tm.tm_mday,
			&g_tm.tm_hour,
			&g_tm.tm_min,
			&g_tm.tm_sec
		);
		g_tm.tm_year-=1900;
		g_tm.tm_mon--;
		g_t=mktime(&g_tm); // todo: timezone
	}
}

int gettimeofday(struct timeval *tv, void *tz){
	if(tv){
		tv->tv_sec=g_t;
		tv->tv_usec=0;
	}
	if(tz)memset(tz,0,8/*sizeof(struct timezone)*/);
	return 0;
}
time_t time(time_t *timer){
	if(timer)*timer=g_t;
	return g_t;
}
