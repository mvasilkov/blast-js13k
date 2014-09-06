jshint:=jshint --verbose
sjs:=sjs --readable-names --module ./ms/ms.sjs
cc:=closure-compiler --language_in ECMASCRIPT5 --compilation_level ADVANCED

boobies:
	$(jshint) scripts/*.js

ms:
	$(sjs) ms/moon.sjs > scripts/moon.js

release:
	rsync -CPaz . animuchan:files/blast-js13k/

prepare_js13k:
	cleancss pub/game.css > ./min/0.css
	html-minifier --collapse-whitespace --collapse-boolean-attributes \
		--remove-attribute-quotes index.html > ./min/0.html
	./inline_css.js > ./min/index.html
	rm ./min/0.*

jsmin_js13k:
	cat ./scripts/aa.js ./scripts/util.js ./scripts/bg.js ./scripts/bgm.js \
		./scripts/moon.js ./scripts/rocket.js ./scripts/rocket_sys.js \
		./scripts/sputnik.js ./scripts/bullet_sys.js ./scripts/game.js \
		> ./min/0.js
	$(cc) --jscomp_off uselessCode ./min/0.js > ./min/1.js
	uglifyjs ./min/1.js --screw-ie8 \
		--compress evaluate=true,unsafe=true \
		--mangle sort=true > ./min/2.js
	cat ./scripts/jsfxr.min.js ./min/2.js > ./min/script.js
	rm ./min/{0,1,2}.*

js13k: prepare_js13k jsmin_js13k

.PHONY: boobies ms min release js13k
