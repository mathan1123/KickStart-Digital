<?php
/**
 * Kickstart Theme Functions & Assets
 */

function kickstart_theme_assets() {
    // Google Fonts (Plus Jakarta Sans)
    wp_enqueue_style('google-fonts-jakarta', 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap', [], null);

    // Font Awesome 6.5.1
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css', [], '6.5.1');

    // Agency Main CSS
    if (file_exists(get_template_directory() . '/css/style.css')) {
        wp_enqueue_style('kickstart-main-css', get_template_directory_uri() . '/css/style.css', [], wp_get_theme()->get('Version'));
    }

    // WP Style CSS
    wp_enqueue_style('kickstart-style', get_stylesheet_uri(), [], wp_get_theme()->get('Version'));

    // Agency Main JS
    if (file_exists(get_template_directory() . '/js/script.js')) {
        wp_enqueue_script('kickstart-main-js', get_template_directory_uri() . '/js/script.js', [], wp_get_theme()->get('Version'), true);
    }
}
add_action('wp_enqueue_scripts', 'kickstart_theme_assets');

// Setup Theme Features
function kickstart_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
    add_theme_support('post-thumbnails');

    register_nav_menus([
        'primary' => __('Primary Menu', 'kickstart-theme'),
    ]);
}
add_action('after_setup_theme', 'kickstart_theme_setup');

// SEO Meta Tags Output
function kickstart_seo_meta_tags() {
    if (is_singular()) {
        $description = get_the_excerpt();
        if (!$description) {
            $description = wp_trim_words(get_the_content(), 55, '...');
        }
        echo "<meta name='description' content='" . esc_attr($description) . "' />\n";
        echo "<meta property='og:title' content='" . esc_attr(get_the_title()) . "' />\n";
        echo "<meta property='og:description' content='" . esc_attr($description) . "' />\n";
        echo "<meta property='og:url' content='" . esc_url(get_permalink()) . "' />\n";
    }
}
add_action('wp_head', 'kickstart_seo_meta_tags');

// Contact Form POST Action Handler
add_action('admin_post_kickstart_send_contact', 'kickstart_handle_contact');
add_action('admin_post_nopriv_kickstart_send_contact', 'kickstart_handle_contact');

function kickstart_handle_contact() {
    $name    = sanitize_text_field($_POST['name'] ?? '');
    $email   = sanitize_email($_POST['email'] ?? '');
    $company = sanitize_text_field($_POST['company'] ?? '');
    $phone   = sanitize_text_field($_POST['phone'] ?? '');
    $message = sanitize_textarea_field($_POST['message'] ?? '');

    // Use WordPress admin email by default; fall back to the site contact mailbox if not set or invalid
    $to = get_option('admin_email');
    if (empty($to) || !is_email($to)) {
        // Replace with desired recipient if admin email isn't configured
        $to = 'kickstartdigital123@gmail.com';
    }
    $subject = "New Growth Inquiry from " . $name;
    $headers = ['Content-Type: text/html; charset=UTF-8'];
    $body    = "<h2>New Inquiry Received</h2>"
             . "<p><strong>Name:</strong> {$name}</p>"
             . "<p><strong>Email:</strong> {$email}</p>"
             . "<p><strong>Company:</strong> {$company}</p>"
             . "<p><strong>Phone:</strong> {$phone}</p>"
             . "<p><strong>Message:</strong><br>" . nl2br($message) . "</p>";

    wp_mail($to, $subject, $body, $headers);

    $referer = wp_get_referer();
    if (!$referer) {
        $referer = home_url('/');
    }
    wp_safe_redirect(add_query_arg('contact_sent', '1', $referer) . '#contact');
    exit;
}
?>
