VERSION := $(shell ruby -Isupport -rgenversion -e getver)

SAFARI := bin/ctouch.safariextz
CRX := bin/ctouch_standard.crx bin/ctouch_fixed.crx bin/ctouch_external.crx bin/ctouch_browserua.crx bin/ctouch_filesystem.crx
#bin/ctouch_true.crx
ZIP := bin/ctouch_browserua.zip bin/ctouch_filesystem.zip
#ZIP := bin/ctouch_fixed.zip bin/ctouch_external.zip bin/ctouch_browserua.zip bin/ctouch_filesystem.zip
#bin/ctouch_true.zip

.PHONY: all clean publish
all: safari crx zip
#crx
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
bin/ctouch.safariextz: $(CTOUCH_COMMON) $(CTOUCH_BROWSERUA_FILES) $(CTOUCH_SAFARI)
	ln -f ctouch_common/ctouch_css.js ctouch.safariextension/
	ln -f ctouch_common/ctouch_touch.js ctouch.safariextension/
	ln -f ctouch_browserua/ctouch_bootstrap.js ctouch.safariextension/
	ruby support/safari.rb ctouch pem/ctouch_safari.pem pem/ctouch_safari.der
	rm -f ctouch.safariextension/*.js
bin/postize.safariextz: postize/* postize.safariextension/*
	ln -f postize/postize_css.js postize.safariextension/
	ruby support/safari.rb postize pem/ctouch_safari.pem pem/ctouch_safari.der
	rm -f postize.safariextension/*.js
#need to port chrome.browserAction API part.
#bin/unpassword.safariextz: unpassword/* unpassword.safariextension/*
#	ln -f unpassword/unpassword_css.js unpassword.safariextension/
#	ruby support/safari.rb unpassword ctouch_safari.pem
#	rm -f unpassword.safariextension/*.js
	
bin/ctouch_browserua.crx: $(CTOUCH_COMMON) $(CTOUCH_BROWSERUA_FILES)
	ruby support/crx.rb $@ pem/ctouch_browserua.pem ctouch_common ctouch_browserua
bin/ctouch_standard.crx: $(CTOUCH_COMMON) $(CTOUCH_STANDARD_FILES)
	ruby support/crx.rb $@ pem/ctouch_standard.pem ctouch_common ctouch_standard
bin/ctouch_fixed.crx: $(CTOUCH_COMMON) $(CTOUCH_FIXED_FILES)
	ruby support/crx.rb $@ pem/ctouch_fixed.pem ctouch_common ctouch_fixed
bin/ctouch_external.crx: $(CTOUCH_COMMON) $(CTOUCH_EXTERNAL_FILES)
	ruby support/crx.rb $@ pem/ctouch_external.pem ctouch_common ctouch_external
bin/ctouch_filesystem.crx: $(CTOUCH_COMMON) $(CTOUCH_FILESYSTEM_FILES)
	ruby support/crx.rb $@ pem/ctouch_filesystem.pem ctouch_common ctouch_filesystem
bin/ctouch_true.crx: $(CTOUCH_COMMON) $(CTOUCH_TRUE_FILES)
	ruby support/crx.rb $@ pem/ctouch_true.pem ctouch_common ctouch_true
bin/postize.crx: postize/*
	ruby support/crx.rb $@ pem/postize.pem postize
bin/unpassword.crx: unpassword/*
	ruby support/crx.rb $@ pem/postize.pem postize

bin/ctouch_browserua.zip: $(CTOUCH_COMMON) $(CTOUCH_BROWSERUA_FILES)
	ruby support/zip.rb $@ pem/ctouch_browserua.pem ctouch_common ctouch_browserua
bin/ctouch_standard.zip: $(CTOUCH_COMMON) $(CTOUCH_STANDARD_FILES)
	ruby support/zip.rb $@ pem/ctouch_standard.pem ctouch_common ctouch_standard
bin/ctouch_fixed.zip: $(CTOUCH_COMMON) $(CTOUCH_FIXED_FILES)
	ruby support/zip.rb $@ pem/ctouch_fixed.pem ctouch_common ctouch_fixed
bin/ctouch_external.zip: $(CTOUCH_COMMON) $(CTOUCH_EXTERNAL_FILES)
	ruby support/zip.rb $@ pem/ctouch_external.pem ctouch_common ctouch_external
bin/ctouch_filesystem.zip: $(CTOUCH_COMMON) $(CTOUCH_FILESYSTEM_FILES)
	ruby support/zip.rb $@ pem/ctouch_filesystem.pem ctouch_common ctouch_filesystem
bin/ctouch_true.zip: $(CTOUCH_COMMON) $(CTOUCH_TRUE_FILES)
	ruby support/zip.rb $@ pem/ctouch_true.pem ctouch_common ctouch_true
bin/postize.zip: postize/*
	ruby support/zip.rb $@ pem/postize.pem postize
bin/unpassword.zip: unpassword/*
	ruby support/zip.rb $@ pem/unpassword.pem unpassword

ctouch_common/ctouch_touch.js: src/ctouch_touch.js
	@ruby support/ctouch_inner.rb $< > $@
ctouch_common/ctouch_css.js: src/ctouch_css.js
	@ruby support/ctouch_inner.rb $< > $@

ctouch_browserua/ctouch_bootstrap.js: src/ctouch_bootstrap.js
	@ruby support/ctouch_insert.rb $@ $<
ctouch_standard/ctouch_bootstrap.js: src/ctouch_bootstrap.js
	@ruby support/ctouch_insert.rb $@ $<
ctouch_fixed/ctouch_bootstrap.js: src/ctouch_bootstrap.js
	@ruby support/ctouch_insert.rb $@ $<
ctouch_external/ctouch_bootstrap.js: src/ctouch_bootstrap.js
	@ruby support/ctouch_insert.rb $@ $<
ctouch_filesystem/ctouch_bootstrap.js: src/ctouch_bootstrap.js
	@ruby support/ctouch_insert.rb $@ $<
ctouch_true/ctouch_bootstrap.js: src/ctouch_bootstrap.js
	@ruby support/ctouch_insert.rb $@ $<

ctouch_standard/ctouch_bg.js: src/ctouch_ualist.json
	@ruby support/ctouch_insert.rb $@ $<
ctouch_external/ctouch_bg.js: src/ctouch_ualist.json
	@ruby support/ctouch_insert.rb $@ $<
ctouch_filesystem/ctouch_bg.js: src/ctouch_ualist.json
	@ruby support/ctouch_insert.rb $@ $<
ctouch_true/ctouch_bg.js: src/ctouch_ualist.json
	@ruby support/ctouch_insert.rb $@ $<

ctouch_standard/ctouch_option.js: src/ctouch_option.js
	@ruby support/ctouch_insert.rb $@ $<
ctouch_external/ctouch_option.js: src/ctouch_option.js
	@ruby support/ctouch_insert.rb $@ $<
ctouch_filesystem/ctouch_option.js: src/ctouch_option.js
	@ruby support/ctouch_insert.rb $@ $<
ctouch_true/ctouch_option.js: src/ctouch_option.js
	@ruby support/ctouch_insert.rb $@ $<

ctouch_standard/ctouch_popup.js: src/ctouch_popup.js
	@ruby support/ctouch_insert.rb $@ $<
ctouch_external/ctouch_popup.js: src/ctouch_popup.js
	@ruby support/ctouch_insert.rb $@ $<
ctouch_filesystem/ctouch_popup.js: src/ctouch_popup.js
	@ruby support/ctouch_insert.rb $@ $<
ctouch_true/ctouch_popup.js: src/ctouch_popup.js
	@ruby support/ctouch_insert.rb $@ $<

clean:
	rm -f $(SAFARI) $(CRX) $(ZIP)

#REVISION=$(shell hg log -l1 --template '{rev}')

#make sure to release before "hg commit"
release:
	@ruby support/updateinfo.rb ctouch.safariextension/Info.plist
	ruby support/genupdate_safari.rb > updates.plist
	@ruby support/updatemanifest.rb ctouch_standard/manifest.json
	@ruby support/updatemanifest.rb ctouch_fixed/manifest.json
	@ruby support/updatemanifest.rb ctouch_external/manifest.json
	@ruby support/updatemanifest.rb ctouch_browserua/manifest.json
	@ruby support/updatemanifest.rb ctouch_filesystem/manifest.json
	@#ruby support/updatemanifest.rb ctouch_true/manifest.json
	ruby support/genupdate.rb > updates.xml
	make all

publish:
	ln -f bin/ctouch.safariextz bin/ctouch-$(VERSION).safariextz
	#ln -f bin/ctouch_standard.crx bin/ctouch_standard-$(VERSION).crx
	#ln -f bin/ctouch_fixed.crx bin/ctouch_fixed-$(VERSION).crx
	#ln -f bin/ctouch_external.crx bin/ctouch_external-$(VERSION).crx
	ln -f bin/ctouch_browserua.crx bin/ctouch_browserua-$(VERSION).crx
	ln -f bin/ctouch_filesystem.crx bin/ctouch_filesystem-$(VERSION).crx
	#ln -f bin/ctouch_true.crx bin/ctouch_true-$(VERSION).crx
	python support/googlecode_upload.py -s ctouch_safari-$(VERSION) -p ctouch $(shell ruby support/getcredential.rb -googlecode) bin/ctouch-$(VERSION).safariextz
	#python support/googlecode_upload.py -s ctouch_standard-$(VERSION) -p ctouch $(shell ruby support/getcredential.rb -googlecode) bin/ctouch_standard-$(VERSION).crx
	#python support/googlecode_upload.py -s ctouch_fixed-$(VERSION) -p ctouch $(shell ruby support/getcredential.rb -googlecode) bin/ctouch_fixed-$(VERSION).crx
	#python support/googlecode_upload.py -s ctouch_external-$(VERSION) -p ctouch $(shell ruby support/getcredential.rb -googlecode) bin/ctouch_external-$(VERSION).crx
	python support/googlecode_upload.py -s ctouch_browserua-$(VERSION) -p ctouch $(shell ruby support/getcredential.rb -googlecode) bin/ctouch_browserua-$(VERSION).crx
	python support/googlecode_upload.py -s ctouch_filesystem-$(VERSION) -p ctouch $(shell ruby support/getcredential.rb -googlecode) bin/ctouch_filesystem-$(VERSION).crx
	#python support/googlecode_upload.py -s ctouch_true-$(VERSION) -p ctouch $(shell ruby support/getcredential.rb -googlecode) bin/ctouch_true-$(VERSION).crx
	rm -f bin/ctouch-$(VERSION).safariextz
	#rm -f bin/ctouch_standard-$(VERSION).crx
	#rm -f bin/ctouch_fixed-$(VERSION).crx
	#rm -f bin/ctouch_external-$(VERSION).crx
	rm -f bin/ctouch_browserua-$(VERSION).crx
	rm -f bin/ctouch_filesystem-$(VERSION).crx
	#rm -f bin/ctouch_true-$(VERSION).crx

#setupwiki:
#	hg clone http://wiki.ctouch.googlecode.com/hg/ wiki
