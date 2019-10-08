export type exampleType = {
  title: string,
  description: string,
  source: string
};

export type productType = {
  "list_price": Object,
  "all_skus_clearance": Boolean,
  "clearance_price": Object,
  "default_image_urls": Object,
  "product_code": string,
  "full_name": string,
  "name": string,
  "brand": string,
  "review_count": Number,
  "review_rating": Number,
  "can_add_to_cart": Boolean,
  "can_add_to_wish_list": Boolean,
  "new_to_mec": Boolean,
  "default_colour_code": string,
  "web_url": string,
  "clearance": Boolean,
  "tracking": Object,
  "product_details_url": string
};

export type categoryType = {
  id: string,
  name: string,
  product_count: Number
}
