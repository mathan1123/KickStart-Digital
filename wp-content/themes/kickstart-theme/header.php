<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
  <?php wp_body_open(); ?>

  <header class="header">
    <div class="container navbar">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="logo">
        KICKSTART<span class="logo-dot"></span>
      </a>

      <nav>
        <?php
        if (has_nav_menu('primary')) {
            wp_nav_menu([
                'theme_location' => 'primary',
                'container'      => false,
                'menu_class'     => 'nav-menu',
            ]);
        } else {
            ?>
            <ul class="nav-menu">
              <li><a href="#hero" class="nav-link">Home</a></li>
              <li><a href="#services" class="nav-link">Services</a></li>
              <li><a href="#about" class="nav-link">About</a></li>
              <li><a href="#results" class="nav-link">Results</a></li>
              <li><a href="#process" class="nav-link">Process</a></li>
              <li><a href="#testimonials" class="nav-link">Testimonials</a></li>
              <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
            <?php
        }
        ?>
      </nav>

      <div class="nav-actions">
        <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle dark/light mode" title="Switch Theme">
          <i class="fa-solid fa-sun"></i>
        </button>
        <a href="#contact" class="btn btn-primary">Get Started</a>
        <button class="hamburger" aria-label="Toggle navigation menu">
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
        </button>
      </div>
    </div>
  </header>
  <main id="main">
