package services

import (
	"sync"
	"time"
)

type cacheItem struct {
	value      interface{}
	expiration int64
}

type CacheService struct {
	items map[string]cacheItem
	mu    sync.RWMutex
}

var (
	GlobalCache *CacheService
	once        sync.Once
)

func NewCacheService() *CacheService {
	once.Do(func() {
		GlobalCache = &CacheService{
			items: make(map[string]cacheItem),
		}
		// Background janitor to clean up expired items
		go GlobalCache.janitor()
	})
	return GlobalCache
}

func (c *CacheService) Set(key string, value interface{}, duration time.Duration) {
	var expiration int64
	if duration > 0 {
		expiration = time.Now().Add(duration).UnixNano()
	}

	c.mu.Lock()
	c.items[key] = cacheItem{
		value:      value,
		expiration: expiration,
	}
	c.mu.Unlock()
}

func (c *CacheService) Get(key string) (interface{}, bool) {
	c.mu.RLock()
	item, found := c.items[key]
	c.mu.RUnlock()

	if !found {
		return nil, false
	}

	if item.expiration > 0 && time.Now().UnixNano() > item.expiration {
		return nil, false
	}

	return item.value, true
}

func (c *CacheService) Delete(key string) {
	c.mu.Lock()
	delete(c.items, key)
	c.mu.Unlock()
}

func (c *CacheService) Clear() {
	c.mu.Lock()
	c.items = make(map[string]cacheItem)
	c.mu.Unlock()
}

func (c *CacheService) janitor() {
	for {
		time.Sleep(5 * time.Minute)
		c.mu.Lock()
		now := time.Now().UnixNano()
		for k, item := range c.items {
			if item.expiration > 0 && now > item.expiration {
				delete(c.items, k)
			}
		}
		c.mu.Unlock()
	}
}
