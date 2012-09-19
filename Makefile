VERSION := $(shell ruby -Isupport -rgenversion -e getver)

SAFARI := ctouch.safariextz
CRX := ctouch_standard.crx ctouch_fixed.crx ctouch_external.crx ctouch_browserua.crx ctouch_filesystem.crx
#ctouch_true.crx
ZIP := ctouch_browserua.zip ctouch_filesystem.zip
#ZIP := ctouch_standard.zip ctouch_fixed.zip ctouch_external.zip ctouch_browserua.zip ctouch_filesystem.zip
#ctouch_true.zip

.PHONY: all clean publish
all: safari crx
#zip
safari: $(SAFARI)
crx: $(CRX)
zip: $(ZIP)

CTOUCH_SAFARI := ctouch.safariextension/Info.plist
CTOUCH_COMMON := ctouch_common/*
CTOUCH_STANDARD_FILES := ctouch_standard/*
CTOUCH_FIXED_FILES := ctouch_fixed/*
CTOUCH_EXTERNAL_FILES := ctouch_external/*
CTOUCH_BROWSERUA_FILES := ctouch_browserua/*
CTOUCH_FILESYSTEM_FILES := ctouch_filesystem/*
CTOUCH_TRUE_FILES := ctouch_true/*

#this needs to be hard link.
ctouch.safariextz: $(CTOUCH_COMMON) $(CTOUCH_BROWSERUA_FILES) $(CTOUCH_SAFARI)
	ln ctouch_common/ctouch_css.js ctouch.safariextension/
	ln ctouch_common/ctouch_touch.js ctouch.safariextension/
	ln ctouch_browserua/ctouch_bootstrap.js ctouch.safariextension/
	ruby support/safari.rb ctouch ctouch_safari.pem
	rm -f ctouch.safariextension/*.js
postize.safariextz: postize/* postize.safariextension/*
	ln postize/postize_css.js postize.safariextension/
	ruby support/safari.rb postize ctouch_safari.pem
	rm -f postize.safariextension/*.js
	
ctouch_browserua.crx: $(CTOUCH_COMMON) $(CTOUCH_BROWSERUA_FILES)
	ruby support/crx.rb $@ ctouch_browserua.pem ctouch_common ctouch_browserua
ctouch_standard.crx: $(CTOUCH_COMMON) $(CTOUCH_STANDARD_FILES)
	ruby support/crx.rb $@ ctouch_standard.pem ctouch_common ctouch_standard
ctouch_fixed.crx: $(CTOUCH_COMMON) $(CTOUCH_FIXED_FILES)
	ruby support/crx.rb $@ ctouch_fixed.pem ctouch_common ctouch_fixed
ctouch_external.crx: $(CTOUCH_COMMON) $(CTOUCH_EXTERNAL_FILES)
	ruby support/crx.rb $@ ctouch_external.pem ctouch_common ctouch_external
ctouch_filesystem.crx: $(CTOUCH_COMMON) $(CTOUCH_FILESYSTEM_FILES)
	ruby support/crx.rb $@ ctouch_filesystem.pem ctouch_common ctouch_filesystem
ctouch_true.crx: $(CTOUCH_COMMON) $(CTOUCH_TRUE_FILES)
	ruby support/crx.rb $@ ctouch_true.pem ctouch_common ctouch_true
postize.crx: postize/*
	ruby support/crx.rb $@ postize.pem postize

ctouch_browserua.zip: $(CTOUCH_COMMON) $(CTOUCH_BROWSERUA_FILES)
	ruby support/zip.rb $@ ctouch_browserua.pem ctouch_common ctouch_browserua
ctouch_standard.zip: $(CTOUCH_COMMON) $(CTOUCH_STANDARD_FILES)
	ruby support/zip.rb $@ ctouch_standard.pem ctouch_common ctouch_standard
ctouch_fixed.zip: $(CTOUCH_COMMON) $(CTOUCH_FIXED_FILES)
	ruby support/zip.rb $@ ctouch_fixed.pem ctouch_common ctouch_fixed
ctouch_external.zip: $(CTOUCH_COMMON) $(CTOUCH_EXTERNAL_FILES)
	ruby support/zip.rb $@ ctouch_external.pem ctouch_common ctouch_external
ctouch_filesystem.zip: $(CTOUCH_COMMON) $(CTOUCH_FILESYSTEM_FILES)
	ruby support/zip.rb $@ ctouch_filesystem.pem ctouch_common ctouch_filesystem
ctouch_true.zip: $(CTOUCH_COMMON) $(CTOUCH_TRUE_FILES)
	ruby support/zip.rb $@ ctouch_true.pem ctouch_common ctouch_true
postize.zip: postize/*
	ruby support/zip.rb $@ postize.pem postize

ctouch_common/ctouch_touch.js: ctouch_touch.js
	ruby support/ctouch_inner.rb $< > $@
ctouch_common/ctouch_css.js: ctouch_css.js
	ruby support/ctouch_inner.rb $< > $@

clean:
	rm -f $(SAFARI) $(CRX) $(ZIP)

#REVISION=$(shell hg log -l1 --template '{rev}')

#make sure to release before "hg commit"
release:
	ruby support/updateinfo.rb ctouch.safariextension/Info.plist
	ruby support/genupdate_safari.rb > updates.plist
	ruby support/updatemanifest.rb ctouch_standard/manifest.json
	ruby support/updatemanifest.rb ctouch_fixed/manifest.json
	ruby support/updatemanifest.rb ctouch_external/manifest.json
	ruby support/updatemanifest.rb ctouch_browserua/manifest.json
	ruby support/updatemanifest.rb ctouch_filesystem/manifest.json
	#ruby support/updatemanifest.rb ctouch_true/manifest.json
	ruby support/genupdate.rb > updates.xml
	make all

publish:
	ln -s ctouch.safariextz ctouch-$(VERSION).safariextz
	ln -s ctouch_standard.crx ctouch_standard-$(VERSION).crx
	ln -s ctouch_fixed.crx ctouch_fixed-$(VERSION).crx
	ln -s ctouch_external.crx ctouch_external-$(VERSION).crx
	ln -s ctouch_browserua.crx ctouch_browserua-$(VERSION).crx
	ln -s ctouch_filesystem.crx ctouch_filesystem-$(VERSION).crx
	#ln -s ctouch_true.crx ctouch_true-$(VERSION).crx
	python support/googlecode_upload.py -s ctouch_safari-$(VERSION) -p ctouch $(shell ruby support/getcredential.rb -googlecode) ctouch-$(VERSION).safariextz
	python support/googlecode_upload.py -s ctouch_standard-$(VERSION) -p ctouch $(shell ruby support/getcredential.rb -googlecode) ctouch_standard-$(VERSION).crx
	python support/googlecode_upload.py -s ctouch_fixed-$(VERSION) -p ctouch $(shell ruby support/getcredential.rb -googlecode) ctouch_fixed-$(VERSION).crx
	python support/googlecode_upload.py -s ctouch_external-$(VERSION) -p ctouch $(shell ruby support/getcredential.rb -googlecode) ctouch_external-$(VERSION).crx
	python support/googlecode_upload.py -s ctouch_browserua-$(VERSION) -p ctouch $(shell ruby support/getcredential.rb -googlecode) ctouch_browserua-$(VERSION).crx
	python support/googlecode_upload.py -s ctouch_filesystem-$(VERSION) -p ctouch $(shell ruby support/getcredential.rb -googlecode) ctouch_filesystem-$(VERSION).crx
	#python support/googlecode_upload.py -s ctouch_true-$(VERSION) -p ctouch $(shell ruby support/getcredential.rb -googlecode) ctouch_true-$(VERSION).crx
	rm -f ctouch-$(VERSION).safariextz
	rm -f ctouch_standard-$(VERSION).crx
	rm -f ctouch_fixed-$(VERSION).crx
	rm -f ctouch_external-$(VERSION).crx
	rm -f ctouch_browserua-$(VERSION).crx
	rm -f ctouch_filesystem-$(VERSION).crx
	#rm -f ctouch_true-$(VERSION).crx

#setupwiki:
#	hg clone http://wiki.ctouch.googlecode.com/hg/ wiki
