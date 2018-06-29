// Import server startup through a single index entry point

import './config.js';
import './fixtures.js';
import './register-api.js';
import './triggers.js';
import './methods.js';

import './cron_recarga.js';
import './cron_stats.js';
import './cron_clean_db.js';
import './cron_users.js';