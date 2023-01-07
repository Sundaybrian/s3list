dev:
	yarn run dev
amka:
	sudo pg_ctlcluster 14 main start
restart:
	sudo service postgresql restart	
kill:
	sudo kill -9 `sudo lsof -t -i:3001`
serve:
	yarn run server	
pm2:
	pm2 start ecosystem.config.js
redis:
	sudo service redis-server start	
push:
	git push origin master
build:
	cd ui && yarn run build
historia:
	git pull origin main --allow-unrelated-histories		
server:
	yarn run server			
deploy: 	
	make build && make push	
migrate:
	npx sequelize-cli db:migrate
push:
	tbd