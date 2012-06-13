VERSION = $(shell ruby -rsupport/genversion.rb -e getver)

CRX = ctouch_standard.crx ctouch_fixed.crx ctouch_external.crx

.PHONY: all clean publish
all: $(CRX)

CTOUCH_COMMON = ctouch_common/*
CTOUCH_STANDARD_FILES = ctouch_standard/*
CTOUCH_FIXED_FILES = ctouch_fixed/*
CTOUCH_EXTERNAL_FILES = ctouch_external/*

ctouch_standard.crx: $(CTOUCH_COMMON) $(CTOUCH_FILES)
	
ctouch_fixed.crx: $(CTOUCH_COMMON) $(CTOUCH_FIXED_FILES)
	ruby support/crx.rb $@ ctouch_fixed.pem ctouch_common ctouch_fixed
ctouch_external.crx: $(CTOUCH_COMMON) $(CTOUCH_EXTERNAL_FILES)
	ruby support/crx.rb $@ ctouch_external.pem ctouch_common ctouch_external

ctouch_common/ctouch_touch.js: ctouch_touch.js
	ruby support/ctouch_touch_inner.rb < $< > $@

clean:
	rm $(CRX)

#REVISION=$(shell hg log -l1 --template '{rev}')

#make sure to release before "hg commit"
release:
	ruby support/crx.rb $@ ctouch_standard.pem ctouch_common ctouch_standard
	ruby support/crx.rb $@ ctouch_fixed.pem ctouch_common ctouch_fixed
	ruby support/crx.rb $@ ctouch_external.pem ctouch_common ctouch_external
	ruby support/genupdate.rb > update.xml

publish:
	ln -s ctouch_standard.crx ctouch_standard-$(VERSION).crx
	ln -s ctouch_fixed.crx ctouch_fixed-$(VERSION).crx
	ln -s ctouch_external.crx ctouch_external-$(VERSION).crx
	python support/googlecode_upload.py -s ctouch_standard-$(VERSION) -p ctouch $(shell ruby support/getcredential.rb -googlecode) ctouch_standard-$(VERSION).crx
	python support/googlecode_upload.py -s ctouch_fixed-$(VERSION) -p ctouch $(shell ruby support/getcredential.rb -googlecode) ctouch_fixed-$(VERSION).crx
	python support/googlecode_upload.py -s ctouch_external-$(VERSION) -p ctouch $(shell ruby support/getcredential.rb -googlecode) ctouch_external-$(VERSION).crx
	rm ctouch_standard-$(VERSION).crx
	rm ctouch_fixed-$(VERSION).crx
	rm ctouch_external-$(VERSION).crx

#setupwiki:
#	hg clone http://wiki.ctouch.googlecode.com/hg/ wiki
