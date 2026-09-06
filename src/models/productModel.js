import { supabase } from "../config/supabaseClient.js";

export const ProductModel = {
  async getAll(categoryId) {
    // 1. Start the base query
    let query = supabase
      .from("products")
      .select("id, sku, name, description, price, stock, category_id");

    // 2. If a category string/ID was passed in, apply the filter
    if (categoryId) {
      query = query.eq("category_id", categoryId);
    }

    // 3. Execute the query
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        id, sku, name, description, price, stock,
        categories ( id, name )
        `
      )
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase
      .from("products")
      .insert([payload])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async remove(id) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
    return { message: "Product deleted successfully" };
  },
};