jshint:=jshint --verbose
sjs:=sjs --readable-names --module ./ms/ms.sjs
cc:=closure-compiler --language_in ECMASCRIPT5 --compilation_level ADVANCED

boobies:
	$(jshint) scripts/*.js

ms:
	$(sjs) ms/moon.sjs > scripts/moon.js

min: ms
	$(cc) scripts/moon.js > scripts/moon.min.js

.PHONY: boobies ms
