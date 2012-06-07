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
	perl ctouch_touch_inner.pl < $< > $@

clean:
	rm $(CRX)
publish:
	python googlecode_upload.py -s ctouch_standard -p ctouch -u cielartisan -w $(shell ruby getpass.rb) ctouch_standard.crx
	python googlecode_upload.py -s ctouch_fixed -p ctouch -u cielartisan -w $(shell ruby getpass.rb) ctouch_fixed.crx
	python googlecode_upload.py -s ctouch_external -p ctouch -u cielartisan -w $(shell ruby getpass.rb) ctouch_external.crx
