jshint:=jshint --verbose
sjs:=sjs --readable-names --module ./ms/ms.sjs
cc:=closure-compiler --language_in ECMASCRIPT5 --compilation_level ADVANCED

boobies:
	$(jshint) scripts/*.js

ms:
	$(sjs) ms/moon.sjs > scripts/moon.js

min: ms
	$(cc) --jscomp_off uselessCode scripts/moon.js > scripts/moon.c_min.js
	uglifyjs scripts/moon.c_min.js --screw-ie8 \
		--compress evaluate=true,unsafe=true \
		--mangle sort=true > scripts/moon.min.js

.PHONY: boobies ms min
