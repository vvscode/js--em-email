import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

import './helpers/qunit-assertions';

setResolver(resolver);
