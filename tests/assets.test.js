import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {products,productImage} from '../src/data/products.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');

test('each catalog product has two valid local WebP assets',()=>{
 for(const p of products){
  for(const alternate of [false,true]){
   const asset=path.join(root,'public',productImage(p,alternate));
   assert.ok(existsSync(asset),`${p.id}: missing ${asset}`);
   const buffer=readFileSync(asset);
   assert.equal(buffer.toString('ascii',0,4),'RIFF',`${asset} has invalid RIFF header`);
   assert.equal(buffer.toString('ascii',8,12),'WEBP',`${asset} is not WebP`);
   assert.ok(buffer.length>2000,`${asset} unexpectedly small`);
  }
 }
});

test('hero and deployment routes have local assets and SPA fallback',()=>{
 const hero=readFileSync(path.join(root,'public/images/hero-headphones.webp'));
 assert.equal(hero.toString('ascii',8,12),'WEBP');
 const config=readFileSync(path.join(root,'netlify.toml'),'utf8');
 assert.match(config,/command\s*=\s*"npm run build"/);
 assert.match(config,/publish\s*=\s*"dist"/);
 assert.match(config,/to\s*=\s*"\/index.html"/);
 assert.match(readFileSync(path.join(root,'public/_redirects'),'utf8'),/\/\*\s+\/index\.html\s+200/);
});
