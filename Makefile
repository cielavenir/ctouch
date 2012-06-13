VERSION = $(shell ruby genversion.rb)

CRX = ctouch_standard.crx ctouch_fixed.crx ctouch_external.crx

.PHONY: all clean publish
all: $(CRX)

CTOUCH_COMMON = ctouch_common/*
CTOUCH_STANDARD_FILES = ctouch_standard/*
CTOUCH_FIXED_FILES = ctouch_fixed/*
CTOUCH_EXTERNAL_FILES = ctouch_external/*

ctouch_standard.crx: $(CTOUCH_COMMON) $(CTOUCH_FILES)
	ruby crx.rb $@ ctouch_standard.pem ctouch_common ctouch_standard
ctouch_fixed.crx: $(CTOUCH_COMMON) $(CTOUCH_FIXED_FILES)
	ruby crx.rb $@ ctouch_fixed.pem ctouch_common ctouch_fixed
ctouch_external.crx: $(CTOUCH_COMMON) $(CTOUCH_EXTERNAL_FILES)
	ruby crx.rb $@ ctouch_external.pem ctouch_common ctouch_external

ctouch_common/ctouch_touch.js: ctouch_touch.js
	ruby ctouch_touch_inner.rb < $< > $@

clean:
	rm $(CRX)

#REVISION=$(shell hg log -l1 --template '{rev}')
publish:
	ln -s ctouch_standard.crx ctouch_standard_r$(REVISION).crx
	ln -s ctouch_fixed.crx ctouch_fixed_r$(REVISION).crx
	ln -s ctouch_external.crx ctouch_external_r$(REVISION).crx
	python googlecode_upload.py -s ctouch_standard_r$(REVISION) -p ctouch $(shell ruby getcredential.rb) ctouch_standard_r$(REVISION).crx
	python googlecode_upload.py -s ctouch_fixed_r$(REVISION) -p ctouch $(shell ruby getcredential.rb) ctouch_fixed_r$(REVISION).crx
	python googlecode_upload.py -s ctouch_external_r$(REVISION) -p ctouch $(shell ruby getcredential.rb) ctouch_external_r$(REVISION).crx
	rm ctouch_standard_r$(REVISION).crx
	rm ctouch_fixed_r$(REVISION).crx
	rm ctouch_external_r$(REVISION).crx

setupwiki:
	hg clone http://wiki.ctouch.googlecode.com/hg/ wiki
