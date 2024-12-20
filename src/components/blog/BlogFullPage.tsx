import React, { useEffect } from 'react';
import styles from './BlogFullPage.module.css';
import { Minimize2 } from 'lucide-react';
import { magazine } from './articles';

interface Props {
    selectedBlog: number | null;
    onClose: () => void;
}

const BlogFullPage: React.FC<Props> = ({ selectedBlog, onClose }) => {

    useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
            e.stopPropagation();
        };

        document.addEventListener('wheel', handleScroll, { passive: false });

        return () => {
            document.removeEventListener('wheel', handleScroll);
        };
    }, []); // Run only once on component mount

    if (selectedBlog === null) {
        return null; // Return null if no blog is selected
    }
    const article = magazine[selectedBlog];
    return (
        <div id={`blog-${selectedBlog}`} className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.titleHeader}>{article.titleHeader}</h1>
                <Minimize2
                    className={styles.min}
                    strokeWidth={3}
                    onClick={onClose}
                    size={24}
                />
            </div>

            <div className={styles.content}>
                <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${article.imageUrl})` }}
                >
                </div>

                <p className={styles.date}>Published on {article.date}</p>
                {article.sections.map((section, index) => (
                    <div key={index} id={section.title.replace(/\s+/g, '-')}>
                        <h2 className={styles.sectionTitle}>{section.title}</h2>
                        <p className={styles.sectionContent}>{section.content}</p>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default BlogFullPage;
